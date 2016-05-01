const {notesIndexPath, notesPath, cleanedPath} = require('./config')
const fs = require('fs')
fs.mkdir(notesPath, function (error) {
    if ( error )  return console.error('Creating the notes directory failed', error)
})

fs.mkdir(cleanedPath, function (error) {
    if ( error )  return console.error('Creating the cleaned directory failed', error)
})

fs.writeFile(notesIndexPath, '{"index":0}', function (error) {
    if ( error )  return console.error('Creating the index file failed', error)
})
