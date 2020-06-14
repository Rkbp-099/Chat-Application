const socket = io();

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('#submitButton');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector("#location-message-template").innerHTML;

socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message,
    });
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = html
    $messages.insertAdjacentElement('beforeend', htmlObject);

});

socket.on('locationMessage', (url) => {
    console.log(url);
    const locationLink = Mustache.render(locationMessageTemplate, {
        url,
    });
    const urlObject = document.createElement('div');
    urlObject.innerHTML = locationLink;
    $messages.insertAdjacentElement('beforeend', urlObject);
    
});


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');
    const message = e.target.elements.message.value;
    // console.log(message);
    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = "";
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }
        console.log("message delivered!!");
    });
});

$locationButton.addEventListener('click', () => {
    $locationButton.setAttribute("disabled", "disabled");
    if (!navigator.geolocation) {
        return alert("Does not Support Location Your Browser!!");
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, (error) => {
            $locationButton.removeAttribute('disabled');
            if (error) {
                return console.log(error);
            }

            console.log("Location shared!");
        });
        // socket.emit('sendLocation', position);
    });
});