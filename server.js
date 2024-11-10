const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rolesAssigned = 0;  // To track the number of connected users

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Assign roles based on the number of users connected
    if (rolesAssigned === 0) {
        // First user gets the applicant role
        socket.emit('assign role', 'applicant');
        rolesAssigned++;
    } else if (rolesAssigned === 1) {
        // Second user gets the owner role
        socket.emit('assign role', 'owner');
        rolesAssigned++;
    }

    // Listen for chat messages and broadcast them
    socket.on('chat message', (data) => {
        if (data.isApplicant) {
            socket.broadcast.emit('chat message', { message: data.message, isApplicant: true });  // From applicant
        } else {
            socket.broadcast.emit('chat message', { message: data.message, isApplicant: false });  // From owner
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
