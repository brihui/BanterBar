const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const feedback = document.getElementById('feedback');
const feedbackMsg = document.getElementById('feedback-msg');
const userMessage = document.getElementById('msg');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const socket = io();

let typing = false;

feedbackMsg.innerHTML = '';

// Maybe sub with post from 2537 lecture 2? 
// Get username and room from querystring
const { username, room } = Qs.parse(location.search, {
    // Ignore signs
    ignoreQueryPrefix: true
});

// Connect to chatroom
socket.emit('joinRoom', { username, room });

// Get room and users.
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
})

// Output message from the server.
// Refer to server.js (io.on).
socket.on('message', message => {
    outputMessage(message);

    // Shows bottom of chat.
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Output typing message from the server.
socket.on('typing', message => {
    feedbackMsg.innerHTML = outputTypingMessage(message);

    // Shows bottom of chat.
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Output typing message from the server.
socket.on('eraseTyping', message => {
    feedbackMsg.innerHTML = message

    // Shows bottom of chat.
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Listens to 'submit' event from the chat form.
chatForm.addEventListener('submit', (event) => {
    typing = false;

    // Prevents default action.
    event.preventDefault();

    // Gets chatbox text input.
    const message = event.target.elements.msg.value;

    // Emit message to the server.
    // Think key-value pair
    socket.emit('chatMessage', message)

    // Clear chat input and focus on chat input.
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();
});

// Listen for when user is typing a message.
userMessage.addEventListener('input', (event) => {
    // Prevents default action.
    event.preventDefault();

    // Emit information to the server.
    if (!typing) {
        socket.emit('userTyping', { username, room });
        typing = true;
    }
});

// Function to output the message to the chat.
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
                     <p class="text"> ${message.text} </p>`;
    document.querySelector('.chat-messages').insertBefore(div, feedback);
}

// Function to output the message to the chat.
function outputTypingMessage(message) {
    return `<p class="text">${message}</p>`;
}

// Add room name to DOM.
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add currents users to DOM.
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}