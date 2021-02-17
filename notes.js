const fs = require('fs');
const chalk = require('chalk');
let warned = chalk.blackBright.bgYellow.bold;
let success = chalk.bold.green;
let deleted = chalk.white.bgRed.bold

// Adding data to the Note
const addData = (title, author) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title );

    if(duplicateNote === undefined){
        notes.push({
            title,
            author
        });
        saveNotes(notes);  
        console.log(success('New note added!'));  
    } else {
        console.log(warned('Note title taken already'));
    }
}

// Display the note list
const listData = () => {
    let notes = loadNotes();
    console.log(notes);
}

// Read data of a book in particular
const readData = (title) => {
    let notes = loadNotes();
    let note = notes.find((note) => note.title === title);
    if(note){
        console.log(`Title : ${note.title}, Author : ${note.author}`);
    } else {
        console.log(warned('No such book is available!'));
    }
    
}

// Remove the data from the list
const removeData = function(title){
    //console.log(`Removed: ${title}`);
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        if(note.title !== title) return true;
    });
    if(notes.length > notesToKeep.length){
        console.log(deleted('Note is deleted!!'));
        saveNotes(notesToKeep); 
    } else {
        console.log(chalk.underline('Nothing removed'));
    }    
}

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

module.exports = {
    addData,
    listData,
    readData,
    removeData
}