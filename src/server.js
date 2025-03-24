
const http = require('http');
const app = require('./app')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://ecoharvest-api:UCevSDXY6cdutUYP@ecoharvest.e3o1b.mongodb.net/?retryWrites=true&w=majority&appName=EcoHarvest'


// This way of listening not only helps to listen to HTTP requests but also other types of connections(websockets, send request and wait for the respoonse)
const server = http.createServer(app);


// Emits events when the connection is ready
mongoose.connection.once('open', () => {
    console.log('MongoDB connection is ready!!')
})


//Checking for mongoDB errors
mongoose.connection.on('error', (err) => {
   console.log('Error connecting with MongoDB: ',err)  
})

async function startServer() {
   await mongoose.connect(MONGO_URL)    

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}...`)
    })
    
}

startServer()
