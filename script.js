const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const themeToggle = document.getElementById('theme-toggle');
const suggestions = document.querySelectorAll('.suggestion');

// Fonction pour ajouter un message dans le chat
function appendMessage(text, isAI = false) {
  const message = document.createElement('div');
  message.classList.add('message', isAI ? 'ai' : 'user');

  const avatar = document.createElement('img');
  avatar.src = isAI
    ? 'https://via.placeholder.com/40?text=AI' // Avatar de l'IA
    : 'https://via.placeholder.com/40?text=U'; // Avatar utilisateur

  const messageText = document.createElement('div');
  messageText.classList.add('text');
  messageText.textContent = text;

  message.appendChild(isAI ? avatar : messageText);
  message.appendChild(isAI ? messageText : avatar);
  messageContainer.appendChild(message);
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Gérer l'envoi du message
messageForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value;
  appendMessage(userMessage);
  messageInput.value = '';

  // Appeler le serveur pour la réponse de l'IA
  const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json();
  appendMessage(data.reply, true);
});

// Suggestions automatiques
suggestions.forEach((button) => {
  button.addEventListener('click', () => {
    messageInput.value = button.textContent;
    messageForm.dispatchEvent(new Event('submit'));
  });
});

// Mode sombre
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});