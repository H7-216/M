const socket = io();

const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

// Listen for messages from the server
socket.on('chat-message', data => {
  const messageElement = document.createElement('div');
  messageElement.textContent = data;
  messageContainer.appendChild(messageElement);
});

// Send messages to the server
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});