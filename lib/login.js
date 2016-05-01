require('./nightmare')
    .goto('https://facebook.com')
    .wait('#stream_pagelet')

    // Wait for user to login
    .then(function () {
        console.log('user should login or close this window now')
    })

    // Handle errors
    .catch(function (error) {
        if ( error )  console.error('Nightmare error:', error)
    })
