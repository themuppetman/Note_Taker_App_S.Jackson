const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api/notes', (req, res) => {
    res.json(notes);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();//install uuid
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});