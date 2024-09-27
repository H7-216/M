// 1. Validation améliorée du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    if (!email.includes('@')) {
        alert('Veuillez entrer une adresse email valide.');
        return;
    }

    // Stocker les données dans Firebase
    firebase.database().ref('contacts').push().set({
        name: name,
        email: email,
        message: message
    }).then(function() {
        alert('Message envoyé avec succès !');
        document.getElementById('contact-form').reset();
    }).catch(function(error) {
        console.error("Erreur lors de l'envoi du message:", error);
        alert('Un problème est survenu. Veuillez réessayer.');
    });
});

// 2. Amélioration de l'envoi de message avec indicateur d'activité pour le chat
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');

sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText !== '') {
        // Désactiver le bouton d'envoi pour éviter les envois multiples
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        firebase.database().ref('messages').push().set({
            "message": messageText
        }).then(function() {
            // Réactiver le bouton après l'envoi
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
            chatInput.value = '';
        }).catch(function(error) {
            console.error("Erreur lors de l'envoi du message:", error);
            alert('Un problème est survenu lors de l\'envoi du message. Veuillez réessayer.');
        });
    }
}

// 3. Défilement automatique avec animation dans le chat
function smoothScrollToBottom() {
    messagesContainer.scroll({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}

firebase.database().ref('messages').on('child_added', function(snapshot) {
    const message = snapshot.val().message;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    smoothScrollToBottom();
});

// 4. Gestion des erreurs Firebase
firebase.database().ref('messages').push().set({
    "message": messageText
}).catch(function(error) {
    console.error("Erreur lors de l'envoi du message:", error);
    alert('Un problème est survenu lors de l\'envoi du message. Veuillez réessayer.');
});
