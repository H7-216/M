// Afficher le nom d'utilisateur
const username = prompt('Enter your name:');
document.getElementById('username-display').textContent = username;
socket.emit('new-user', username);

// Déconnexion (Logout)
document.getElementById('logout-btn').addEventListener('click', () => {
  alert('You have been logged out.');
  location.reload();
});

// Gestion des emojis
const emojiBtn = document.getElementById('emoji-btn');
const emojiPicker = document.getElementById('emoji-picker');
emojiBtn.addEventListener('click', () => {
  emojiPicker.classList.toggle('hidden');
});

// Ajouter emoji au message
emojiPicker.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const emoji = e.target.textContent;
    const messageInput = document.getElementById('message-input');
    messageInput.value += emoji;
  }
});

// Upload de fichiers
document.getElementById('file-upload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    alert(`File "${file.name}" selected. This feature will upload soon.`);
  }
});