const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname,'/../public')));

app.get('/', (req, res) => {
    res.render('index');    
});


io.on('connection', (socket) => {
    console.log('New Websocket connection established');

    socket.emit('message', generateMessage("Welcome New User to this infernal application...}:)"));
    socket.broadcast.emit('message', generateMessage("A new user joined!!"));

    socket.on('sendMessage', (msg, callback) => {
        // count++;
        const filter = new Filter();
        if (filter.isProfane(msg)){
            return callback("Profanity is not allowed");
        }
        io.emit('message', generateMessage(msg)); 
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage("A user has left!!"));
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// console.log(__dirname + '/../public');