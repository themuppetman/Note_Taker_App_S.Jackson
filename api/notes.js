let notes = [];
 
const fs = require('fs');
const path = require('path');

// Function to save notes to a file
function saveNotesToFile() {
    const data = JSON.stringify(notes);
    fs.writeFileSync(path.join(__dirname, 'notes.json'), data);
}

function loadNotesFromFile() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'notes.json'));
        notes = JSON.parse(data);
    } catch (error) {
        notes = [];
    }
}

loadNotesFromFile();

notes.push({ title: 'Example Note', content: 'This is an example note.' });

saveNotesToFile();
