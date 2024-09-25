// Import the socket.io module and listen on port 8000
const io = require('socket.io')(8000, {
    cors: {
        origin: "http://localhost:63342",  // Allow CORS from the specified front-end URL
        methods: ["GET", "POST"]  // Allowed HTTP methods
    }
});

console.log("Socket.io server running on port 8000");

// Object to store the usernames associated with each socket connection
const users = {};

// -- step 1 --
// Listen for connections from clients
io.on('connection', socket => {

    // -- step 3 --
    // Event listener for when a new user joins
    socket.on('new-user-joined', name => {
        console.log("New user", name);  // Log the new user
        users[socket.id] = name;  // Store the user's name with their socket ID
        socket.broadcast.emit('user-joined', name);  // Notify all other clients that a new user joined
    });

    // -- step 8 --
    // Event listener for when a user sends a message
    socket.on('send', message => {
        // Broadcast the message to all other clients
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });


    // -- step 11 --
    // Event listener for when a user left the chat
    socket.on('disconnect', message => {
        // Broadcast the message to all other clients
        socket.broadcast.emit('left', users[socket.id]);
    });
});
