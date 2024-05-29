const express = require('express');
const path = require('path');
const apiRouter = require('./routes'); // Assuming routes is the directory containing router.js

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the API router
app.use('/api', apiRouter);

// Route to serve the HTML page (if you have one)
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
