const yargs = require('yargs')
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
        console.log('Done')
    }
    else {
        console.log('This note already exists')
    
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

yargs.argv