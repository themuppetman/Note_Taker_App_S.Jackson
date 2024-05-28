const express = require('express');
const router = express.Router();

// Import the notes router module
const notesRouter = require('./notes');

// Use the notes router for routes starting with /notes
router.use('/notes', notesRouter);

module.exports = router;
