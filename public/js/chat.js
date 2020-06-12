const socket = io();
socket.on('message', (message) => {
    console.log(message);
});


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = e.target.elements.message.value;
    // console.log(message);
    socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click',() => {
    if (!navigator.geolocation) {
        return alert("Does not Support Location Your Browser!!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        socket.emit('sendLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
        // socket.emit('sendLocation', position);
    });
});