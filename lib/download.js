const {notesIndexPath, notesDataPath, notesPath} = require('./config')
const path = require('path')
const fs = require('fs')
const index = require(notesIndexPath).index
const url = require(notesDataPath).urls[index]
require('./nightmare')

    // Go to the current indexes post
    .goto(url)
    .wait(1000)

    // Fetch the title and document body
    .evaluate(function () {
        return `<html><head>\n${document.querySelector('title').outerHTML}\n</head><body>\n${document.body.innerHTML}\n</body></html>`
    })

    // Close the browser
    .end()

    // Save the posts content
    .then(function (html) {
        const postPath = path.join(notesPath, url.split('/').slice(-2).reverse().join('-')) + '.html'
        // Write the post content
        fs.writeFile(postPath, html, function (error) {
            if ( error )  return console.error('Write post error:', error)
            // Bump the index
            fs.writeFile(notesIndexPath, JSON.stringify({index: index + 1}), function (error) {
                if ( error )  return console.error('Write index error:', error)
            })
        })
    })

    // Handle errors
    .catch(function (error) {
        if ( error )  console.error('Nightmare error:', error)
    })
