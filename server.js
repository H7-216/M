const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Stocker les utilisateurs connectés
let users = {};

// Configurer Express pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Gérer la connexion des utilisateurs
io.on('connection', socket => {
  console.log('A user connected:', socket.id);

  // Quand un nouvel utilisateur rejoint
  socket.on('new-user', username => {
    users[socket.id] = username; // Associer le socket ID à l'utilisateur
    socket.broadcast.emit('user-connected', username); // Informer les autres utilisateurs
    io.emit('update-users', Object.values(users)); // Mettre à jour la liste des utilisateurs
    console.log(`${username} has joined the chat`);
  });

  // Réception et diffusion des messages
  socket.on('send-chat-message', message => {
    const username = users[socket.id];
    if (username) {
      io.emit('chat-message', { message, username });
      console.log(`${username}: ${message}`);
    }
  });

  // Gérer la déconnexion
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id]; // Supprimer l'utilisateur déconnecté
      socket.broadcast.emit('user-disconnected', username); // Informer les autres utilisateurs
      io.emit('update-users', Object.values(users)); // Mettre à jour la liste des utilisateurs
      console.log(`${username} has left the chat`);
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});