#!/usr/bin/env node
const exec = require('child_process').exec
const join = require('path').join

const opts = {env: process.env, cwd: process.cwd()}

const setup = join(__dirname, 'lib', 'setup.js')
const login = join(__dirname, 'lib', 'login.js')
const urls = join(__dirname, 'lib', 'urls.js')
const downloader = join(__dirname, 'lib', 'downloaded.js')
const clean = join(__dirname, 'lib', 'clean.js')

exec(`node --harmony ${setup}`, opts, function (error, stdout, stderr) {
    if ( error || stderr )  return console.error(error || stderr)

    exec(`node --harmony ${login}`, opts, function (error, stdout, stderr) {
        if ( error || stderr )  return console.error(error || stderr)

        exec(`node --harmony ${urls}`, opts, function (error, stdout, stderr) {
            if ( error || stderr )  return console.error(error || stderr)

            exec(`node --harmony ${downloader}`, opts, function (error, stdout, stderr) {
                if ( error || stderr )  return console.error(error || stderr)

                exec(`node --harmony ${clean}`, opts, function (error, stdout, stderr) {
                    if ( error || stderr )  return console.error(error || stderr)
                    console.log('all done')
                })
            })
        })
    })
})
