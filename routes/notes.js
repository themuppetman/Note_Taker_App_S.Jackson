const note = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend, 
  writeToFile, 
} = require('./helpers/fsUtils');

//GET all notes
note.get ('/', (req, res) => {
  readfromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GET a note by ID
note.get('/:id', (req, res) => {
  const id = req.params.id;
  readFromFile('db/db.json')
  then((data) => JSON.parse(data))
  then((json)) ; {
    const note = json.find((note) => note.id === id);
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  };  
});

// Create a new note
note.post('/', (req, res) => {
  console.log(req.body);

  const { title, content } = req.body;
  
  if (req.body) {
    const newNote = {
      id: uuidv4(),
      title,
      content,
    };
    readAndAppend('db/db.json', JSON.stringify(newNote));
    res.json('New note created');
  } else {
    res.error('Error creating note');
  }
});

module.exports = note;
