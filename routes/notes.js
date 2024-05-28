const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const filePath = path.join(__dirname, '../db/notes.json');

// Function to save the note
function saveNoteToFile(note, file, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err && err.code === 'ENOENT') {
            data = '[]';
        } else if (err) {
            return callback(err);
        }

        let notes = JSON.parse(data);
        notes.push(note);

        fs.writeFile(file, JSON.stringify(notes, null, 2), (err) => {
            if (err) return callback(err);
            callback(null);
        });
    });
}

// Route to handle getting notes
router.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading notes.');
        }
        res.send(data);
    });
});

// Route to handle adding a new note
router.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4(); // Assign a unique ID to the note

    if (!newNote.title || !newNote.text) {
        return res.status(400).send('Note must have a title and text.');
    }

    saveNoteToFile(newNote, filePath, (err) => {
        if (err) {
            return res.status(500).send('Error saving the note.');
        }
        res.status(200).send('Note saved successfully.');
    });
});

// Optional: Route to handle deleting a note (if implemented)
router.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading notes.');
        }

        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);

        fs.writeFile(filePath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error deleting the note.');
            }
            res.status(200).send('Note deleted successfully.');
        });
    });
});

module.exports = router;
