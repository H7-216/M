// Simule une réponse d'IA
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Ajouter le message utilisateur et IA
function appendMessage(message, isAI = false) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.style.textAlign = isAI ? 'left' : 'right';
  messageElement.style.marginBottom = '10px';
  messageElement.style.padding = '10px';
  messageElement.style.background = isAI ? '#e0e0e0' : '#007bff';
  messageElement.style.color = isAI ? '#000' : '#fff';
  messageElement.style.borderRadius = '10px';
  messageContainer.appendChild(messageElement);
}

// Gérer l'envoi du message
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  messageInput.value = '';
  // Simuler une réponse de l'IA
  setTimeout(() => {
    appendMessage(`AI: I'm here to help!`, true);
  }, 1000);
});