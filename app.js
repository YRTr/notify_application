const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// customize yargs version
yargs.version('1.1.0');

// create add command
yargs.command({
    command: 'add', 
    describe: 'Add a new note',
    builder: { 
        title: {
            describe: 'Title',
            demandOption: true, // must define the title
            type: 'string', // must be string
        },
        author: {
            describe: 'Author',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.addData(argv.title, argv.author);
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeData(argv.title);
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'display the list',
    handler() {
        notes.listData();
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'read the list',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
       notes.readData(argv.title);
    }
})

yargs.parse();