const yargs = require('yargs')
const fs =require('fs')

const addNote =function (title,body) {
   
    const notes = loadNotes()
    const note = {
        title: title,
        body: body
    }
    notes.push(note)
    saveNote(notes)

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
        console.log('buyoda xato borikan')
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