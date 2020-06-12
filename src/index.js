const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'/../public')));

app.get('/', (req, res) => {
    res.render('index');    
});



const message = "Welcome New User to this infernal application...}:)"

io.on('connection', (socket) => {
    console.log('New Websocket connection established');
    socket.emit('message', message);

    socket.on('sendMessage', (msg) => {
        // count++;
        io.emit('message', msg);
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// console.log(__dirname + '/../public');