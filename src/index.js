const http = require('http');
const path = require('path');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

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
    socket.broadcast.emit('message', "A new user joined!!");

    socket.on('sendMessage', (msg, callback) => {
        // count++;
        const filter = new Filter();
        if (filter.isProfane(msg)){
            return callback("Profanity is not allowed");
        }
        io.emit('message', msg); 
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', "A user has left!!");
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
        callback();
    })
})

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// console.log(__dirname + '/../public');