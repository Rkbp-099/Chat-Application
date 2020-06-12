const socket = io();
socket.on('message', (message) => {
    console.log(message);
});


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = e.target.elements.message.value;
    // console.log(message);
    socket.emit('sendMessage', message);
})