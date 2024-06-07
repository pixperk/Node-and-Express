const express = require('express') // Import Express module

const app = express() // Create an Express application

app.get('/', (req, res) => { // Define a route for GET requests to '/'
    return res.send('Hello from HOME') // Send a response to the client
})

app.get('/about', (req, res) => { // Define a route for GET requests to '/about'
    return res.send(`Hey ${req.query.name}`) // Send a response to the client
})

app.listen(8000, () => { // Start the server on port 8000
    console.log("Server Started!"); // Print a message to the console
});