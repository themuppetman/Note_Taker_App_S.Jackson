const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Create an instance of the Express application
const note = express();
const PORT = process.env.PORT || 3001; 


// Middleware
note.use(express.json());
note.use('/routes', api);
note.use(express.static('public'));

// GET Route for home page
note.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// GET Route for notes page
note.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Start the server
note.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
