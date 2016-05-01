const {notesIndexPath, notesDataPath, notesPath, cleanedPath} = require('./config')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')
fs.readdir(notesPath, function (error, files) {
    if ( error )  return console.error('Read directory error:', error)
    Promise.all(
        files.map(function (file) {
            return new Promise(function (resolve, reject) {
                fs.readFile(path.join(notesPath, file), function (error, result) {
                    if ( error )  return reject(error)
                    const html = result.toString()
                    const $ = cheerio.load(html)
                    const title = $('title').text()
                    const time = $('[role=main] a').eq(1).text()
                    const body = $('#noteMessageBox').parent().children().find('.clearfix').eq(1).html()
                    if ( !body || body === 'false' ) {
                        // console.log()
                        throw new Error('Selector failed to return data')
                    }
                    require('node-readability')(body, function (error, article) {
                        if ( error )  return reject(error)
                        const result = `<html><head>\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css" />\n<title>${title}</title>\n<meta name="PublishDate" content="${time}"/>\n</head><body>\n<h1>${title}</h1>\n<h2>${time}</h2>\n${article.content || body}\n</body></html>`
                        fs.writeFile(path.join(cleanedPath, file), result, function (error) {
                            if ( error )  return reject(error)
                            resolve()
                        })
                    })
                })
            })
        })
    )
    .then(function () {
        console.log('All done')
    })
    .catch(function (error) {
        if ( error )  console.error('Promise error:', error)
    })
})
