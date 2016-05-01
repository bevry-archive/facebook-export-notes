const path = require('path')
const cwd = process.cwd()
const notesPath = path.join(cwd, 'notes')
const cleanedPath = path.join(cwd, 'cleaned')
const notesDataPath = path.join(cwd, 'notes.json')
const notesIndexPath = path.join(cwd, 'index.json')
module.exports = {notesPath, cleanedPath, notesDataPath, notesIndexPath}
