// Connect to the server using socket.io at port 8000
const socket = io('http://localhost:8000');

// Get references to the form and message input field
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


// -- step 2 --
// Prompt the user to enter their name when they join the chat
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);  // Notify the server that a new user has joined


// -- step 4 --
// Listen for 'user-joined' event from the server and display a message
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left');  // Display the new user joining message on the left
});

// -- step 6 --
// Event listener for submitting the form (sending a message)
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent the form from submitting the traditional way
    const message = messageInput.value;  // Get the message typed by the user
    append(`You: ${message}`, 'right');  // Display the message in the chat window on the right
    socket.emit('send', message);  // Send the message to the server
    messageInput.value = '';  // Clear the input field after sending
});


// -- step 9 --
// Listen for 'receive' event from the server and display the received message
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');  // Display received message on the left
});

// -- step 12 --
// Listen for 'receive' event from the server and display the received message
socket.on('left', name => {
    append(`${name}: left the chat`, 'left');  // Display received message on the left
});

// -- step 5 -- , // -- step 7 --, // -- step 10 -- // -- step 13 --
// Function to append a new message to the chat window
const append = (message, position) => {
    const messageElement = document.createElement('div');  // Create a new <div> for the message
    messageElement.innerText = message;  // Set the message text
    messageElement.classList.add('message');  // Add the 'message' class for styling
    messageElement.classList.add(position);  // Add the position class ('left' or 'right')
    messageContainer.append(messageElement);  // Append the message to the chat container
};