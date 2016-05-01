const {notesDataPath} = require('./config')
const fs = require('fs')
require('./nightmare')
    .goto('https://www.facebook.com/balupton?sk=notes_my_notes')
    .wait(1000)

    // Keep scrolling to the bottom
    .evaluate(function () {
        setInterval(function () {
            window.scrollTo(0, document.body.scrollHeight)
        })
    })

    // Once all items have been loaded, as indicated by this element not existing anymore
    .wait(function () {
        return !document.querySelector('[id^=pagelet_timeline_app_collection] > img')
    })

    // Fetch all the urls of the loaded items
    .evaluate(function () {
        const urls = []
        const items = document.querySelectorAll('[id^=pagelet_timeline_app_collection] > div')
        for ( let i = 0, n = items.length; i < n; ++i ) {
            const child = items[i]
            const url = child.querySelectorAll('a')[2].href
            urls.push(url)
        }
        return urls
    })

    // Close the browser
    .end()

    // And write the urls
    .then(function (urls) {
        fs.writeFile(notesDataPath, JSON.stringify({urls}), function (error) {
            if ( error )  return console.error('Write data error:', error)
        })
    })

    // Handle errors
    .catch(function (error) {
        if ( error )  console.error('Nightmare error:', error)
    })
