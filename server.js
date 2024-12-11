const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

io.on('connection', socket => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});