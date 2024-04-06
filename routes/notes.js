const notes = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    // console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// notes.get ('/notes' , (req, res) => {
//     const noteId = req.params;
//     readFromFile('./db/db.json')
//         .then((data) => JSON.parse(data))
//         .then((json) => {
//             const result = json.filter((note) => note.id === noteId);
//             return result.length > 0
//                 ? res.json(result)
//                 : res.json('No note with that ID');
//         });
// });

notes.post('./', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuid(),
        };
        readAndAppend(newNotes, './db/db.json');
        res.json(`Note successfully added!`);
    } else {
        res.error('Error adding note');
    }
}); 

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            // sort this out 
            const result = json.filter((note) => id !== id);
            writeToFile('./db/db.json', result);
            res.json(`Item ${id} has been deleted 🗑️`);
        });
});

module.exports = notes;