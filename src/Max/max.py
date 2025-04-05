from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel 
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.chat_history import BaseChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_groq import ChatGroq
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from chromadb.config import Settings
from langchain_chroma import Chroma
from langchain.tools import Tool
from langchain.agents import initialize_agent, AgentType
import os
from dotenv import load_dotenv


load_dotenv()
os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

app = FastAPI()

origins = [
    "http://localhost:3000",
   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)




embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

llm = ChatGroq(model_name="Deepseek-R1-Distill-Llama-70b")

#Session store
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
        persist_directory=f"./max.db",
        client_settings=Settings(
            persist_directory=f"./max.db"
        )
    )
    return vectorstore


tools = [get_customer_feedback_tool, calculate_math_tool]

agent = initialize_agent(
    tools=tools,
    llm=llm,  # Your LLM (Groq)
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,  # Enable function calling
    verbose=True
)


get_customer_feedback_tool = Tool(
    name="get_customer_feedback",
    func=get_customer_feedback,
    description="Get feedback from the customer and record it in the database",
)

calculate_math_tool = Tool(
    name="calculate_math",
    func=calculate_math,
    description="Perform mathematical calculations",
)

def get_customer_feedback(customerName, email, feedback):
    
    return f"Feedback from {customerName} ({email}): {feedback}"

def calculate_math(expression: str):
    try:
        return eval(expression)
    except:
        return "invalid mathematical expression"

# Initialize Chroma with pre-loaded PDF
vectorstore = process_pdf('max2.pdf')
retriever = vectorstore.as_retriever()


@app.post("/ask_question/")
async def ask_question(request: QuestionRequest):

    session_id = request.session_id
    question = request.question

    if session_id not in session_store:
        retriever2 = retriever
    else:
        retriever2 = session_store[session_id]["retriever"]
    
    contextualize_q_system_prompt = (
        "Given the chat history and the latest user question"
        "which might reference context in the chat history"
        "formulate a standalone question which can be understood"
        "without the chat history. DO NOT answer the question,"
        "just reformulate it if needed and otherwise return as it is."
    )

    contextualize_q_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", contextualize_q_system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ]
    )

    history_aware_retriever = create_history_aware_retriever(llm, retriever2, contextualize_q_prompt)

    system_prompt = (
        """You are an AI assistant of an e-commerce platform.Your name is Max. Use functions to get real-time data:

        - ALWAYS call get_customer_feedback for recording customer feedback
        - ALWAYS call calculate_math for mathematical calculations
        - NEVER guess the answers, always use the functions provided or the context provided
        - Explain anomalies if API returns errors
        - Always use the context provided to answer the question
        - If the question is not related to the context, say "It is out of my scope to answer this question"
        - Address the person as "sir/madam"

        Use the following pieces of retrieved context : \n\n{context}"""
    )


    qa_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history"),
            ("human", "{input}")
        ]
    )

    question_answer_chain = create_stuff_documents_chain(llm, qa_prompt)
    rag_chain = create_retrieval_chain(history_aware_retriever, question_answer_chain)

    if session_id not in session_store:
        session_store[session_id] = {
            "rag_chain" : rag_chain,
            "history": ChatMessageHistory(),
            "retriever": retriever2
        }

    rag_chain = session_store[session_id]["rag_chain"]
    session_history = session_store[session_id]["history"]

    last_6_messages = session_history.messages[-6:]

    response = agent.invoke(
        {"input": question, "chat_history": last_6_messages}
    )

    try:
        response = rag_chain.invoke(
            {"input": question, "chat_history": last_6_messages},
            config={
                "configurable": {"session_id": session_id}
            }
        )

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}, 500
 

    if "answer" not in response:
        return {"error": "No answer generated by the model."}, 500

    answer = str(response.get("answer", ""))

    session_history.add_user_message(question)
    session_history.add_ai_message(answer)


    

    end_tag = '</think>' 

    end_tag_pos = answer.find(end_tag)

    if end_tag_pos != -1:
        result = answer[end_tag_pos + len(end_tag):].strip()
    else:
        end_tag = '<think>'
        end_tag_pos = answer.find(end_tag)
        if end_tag_pos != -1:
            result = answer[end_tag_pos + len(end_tag):].strip()
        
        result = answer
        

    return {"answer": result}


@app.get("/")
def home():
    return {"message": "Welcome to Max"}

if __name__ == "__main__":  
    import uvicorn
    uvicorn.run("max:app", host="0.0.0.0", port=5000, reload=True)  # Corrected
