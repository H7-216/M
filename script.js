const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const themeToggle = document.getElementById('theme-toggle');

// Ajouter un message au chat
function appendMessage(text, isAI = false) {
  const message = document.createElement('div');
  message.classList.add('message', isAI ? 'ai' : 'user');
  message.textContent = text;
  messageContainer.appendChild(message);
  messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll auto
}

// Envoyer un message
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value;
  appendMessage(userMessage);
  messageInput.value = '';

  // Envoyer le message au serveur
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  appendMessage(data.reply, true);
});

// Mode sombre
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});