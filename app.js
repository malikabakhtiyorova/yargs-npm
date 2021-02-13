const yargs = require('yargs')
const chalk = require('chalk')
const fs =require('fs')

const addNote =function (title,body) {
   
    const notes = loadNotes()
    const duplicatedNotes = notes.filter(function (note) {
        return note.title === title && note.body === body
    })
    if (duplicatedNotes.length === 0) {
        const note = {
            title: title,
            body: body
        }
        notes.push(note)
        saveNote(notes)
        console.log(chalk.green('Done'))
    }
    else {
        console.log(chalk.red('This note already exists'))
    
}

}
const removeNote =function (title,body) {
   
    let notes = loadNotes()
    const duplicatedNotes = notes.filter(function (note) {
        return note.title === title && note.body === body
    })
    if (duplicatedNotes.length === 0) {
      console.log(chalk.bgRed('ther\'s no such note'))
    }
    else {
        const removedNotes = notes.filter(function (note) {
            return note.title !== title && note.body !== body
        })

        notes = removedNotes
        saveNote(notes)
        console.log(chalk.bgGreen('removed'))
    
}

}

const saveNote =function (notes) {
    const sh = JSON.stringify(notes)
    fs.writeFileSync('notes.json', sh)
}

const loadNotes = () => {
    try{
        const yo = fs.readFileSync('notes.json')
        const you = yo.toString()
        return JSON.parse(you)
    }
    catch(e) {
        return []
    }
}

yargs.command({
    command: 'add',
    describe: "wew",
    builders: {
        title: {
            describe: 'dad',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'mom',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
    addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: "wew",
    builders: {
        title: {
            describe: 'dad',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'mom',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
    removeNote(argv.title, argv.body)
    }
})

yargs.argv