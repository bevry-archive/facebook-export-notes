const cmd = require('path').join(__dirname, 'index.js')
function run () {
    console.log('Running...')
    require('child_process').exec(`node --harmony ${cmd}`, function (error, stdout, stderr) {
        if ( error ) {
            return console.error('Command error:', error)
        }
        else if ( stderr ) {
            return console.log('Should now be done as an error occured:', stderr)
        }
        else {
            console.log('Running again...')
            run()
        }
    })
}
run()
