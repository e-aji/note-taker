const notes = require('express').Router();
const { v4 : uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


notes.get = ('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.get ('/:notes' , (req, res) => {
    const noteId = req.params.noteId;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.tip_id === tipId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

notes.delete = ('/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

notes.post = ('/', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note successfully added!`);
    } else {
        res.error('Error adding note');
    }

}); 

module.exports = notes;