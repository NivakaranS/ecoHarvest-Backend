
const http = require('http');
const app = require('./app')

const PORT = process.env.PORT || 8000;



// This way of listening not only helps to listen to HTTP requests but also other types of connections(websockets, send request and wait for the respoonse)
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
})



