// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCl2tmy-LU8KHs2s1BjG2CdmvaOr4E3fvY",
    authDomain: "saaa-7b92d.firebaseapp.com",
    projectId: "saaa-7b92d",
    storageBucket: "saaa-7b92d.appspot.com",
    messagingSenderId: "464310225000",
    appId: "464310225000:web:2728c6f3911bdd2cfd53dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Message sent!');
    // Here you can add code to actually send the message
});

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
        firebase.database().ref('messages').push().set({
            "message": messageText
        });
        chatInput.value = '';
    }
}

// Listen for new messages
firebase.database().ref('messages').on('child_added', function(snapshot) {
    const message = snapshot.val().message;
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
