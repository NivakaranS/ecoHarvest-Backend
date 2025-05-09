from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_chroma import Chroma
from langchain.tools import Tool
import os
import json
import re
from dotenv import load_dotenv


load_dotenv()
os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
llm = ChatGroq(model_name="Deepseek-R1-Distill-Llama-70b")
session_store = {}

class QuestionRequest(BaseModel):
    session_id: str
    question: str

def process_pdf(file_path):
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=5000, chunk_overlap=500)
    splits = text_splitter.split_documents(documents)
    vectorstore = Chroma.from_documents(
        documents=splits,
        embedding=embeddings,
        persist_directory="./max.db"
    )
    return vectorstore

def get_customer_feedback(customerName: str, email: str, feedback: str):
    if not all(isinstance(x, str) for x in [customerName, email, feedback]):
        raise ValueError("All parameters must be strings")
    if "@" not in email or "." not in email.split("@")[-1]:
        raise ValueError("Invalid email format")
    return f"Feedback from {customerName} ({email}) recorded: {feedback[:200]}"

def calculate_math(expression: str):
    allowed_chars = set("0123456789+-*/(). ")
    if not all(c in allowed_chars for c in expression):
        raise ValueError("Invalid characters in expression")
    try:
        return str(eval(expression))
    except Exception as e:
        return f"Calculation error: {str(e)}"

get_customer_feedback_tool = Tool(
    name="get_customer_feedback",
    func=get_customer_feedback,
    description="Record customer feedback. Parameters: customerName (string), email (string), feedback (string)."
)

calculate_math_tool = Tool(
    name="calculate_math",
    func=calculate_math,
    description="Perform math calculations. Parameters: expression (string)."
)

tools = [get_customer_feedback_tool, calculate_math_tool]
vectorstore = process_pdf('max3.pdf')
retriever = vectorstore.as_retriever()

def execute_function_call(raw_response: str):
    # Split response into think section and answer section
    think_end = raw_response.find('</think>')
    answer_section = raw_response[think_end + len('</think>'):].strip() if think_end != -1 else raw_response.strip()

    # Extract and process function calls from answer section
    function_calls = []
    while '<function>' in answer_section:
        start_idx = answer_section.find('<function>') + len('<function>')
        end_idx = answer_section.find('</function>', start_idx) or len(answer_section)
        function_call = answer_section[start_idx:end_idx].strip()
        function_calls.append(function_call)
        answer_section = answer_section[end_idx + len('</function>'):]

    # Execute function calls
    results = []
    for call in function_calls:
        try:
            tool_name, param_str = call.split(':', 1)
            params = json.loads(param_str.replace("'", '"').strip())
            tool = next(t for t in tools if t.name == tool_name.strip())
            result = tool.run(**params)
            results.append(f"{tool_name.strip()} result: {result}")
        except Exception as e:
            results.append(f" Error in {call[:24]}: {str(e)}")

    # Clean remaining tags and combine results
    clean_answer = re.sub(r'<\/?function>', '', answer_section).strip()
    final_answer = clean_answer + ('\n\n' + '\n'.join(results) if results else '')
    
    return final_answer

@app.post("/ask_question/")
async def ask_question(request: QuestionRequest):
    session_id = request.session_id
    question = request.question

    try:
        if session_id not in session_store:
            session_store[session_id] = {
                "history": ChatMessageHistory(),
                "retriever": retriever
            }

        session = session_store[session_id]
        history = session["history"]
        last_messages = history.messages[-6:]

        # RAG processing
        contextualize_q_prompt = ChatPromptTemplate.from_messages([
            ("system", "Rephrase questions considering chat history."),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
        
        history_aware_retriever = create_history_aware_retriever(
            llm, session["retriever"], contextualize_q_prompt
        )

        system_prompt = """You are Max, an e-commerce assistant. Strict rules:
        You only provide answers based on the context provided about ecoHarvest or carryout the following functions:
        **Available Functions:**
        1. calculate_math: 
        - Use for: Any mathematical calculations
        - Parameters: "expression": "mathematical expression as string"
        - Example: <function>calculate_math: "expression":"80*0.15" </function>

        2. get_customer_feedback:
        - Use for: Recording customer reviews/feedback
        - Parameters: "customerName": "string", "email": "string", "feedback": "string"
        - Example: <function>get_customer_feedback: "customerName": [customer name],"email":[email], "feedback": [customer feedback]</function>


        3. Function calls MUST:
        - Be wrapped in <function> tags
        - Use EXACT parameter names
        - Appear where their results should be used

        4. Never invent functions - only use the 2 listed above

        5. For ecoHarvest-related questions, use the context below:
        {context}"""

        
        qa_prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ])
        
        question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
        rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

        # Get and process response
        result = rag_chain.invoke({
            "input": question,
            "chat_history": last_messages
        })
        final_answer = execute_function_call(result["answer"])

        # Update history
        history.add_user_message(question)
        history.add_ai_message(final_answer)

        return {"answer": final_answer}

    except Exception as e:
        return {"error": f"Processing failed: {str(e)}"}, 500

@app.get("/")
def home():
    return {"message": "Welcome to Max"}

if __name__ == "__main__":  
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)