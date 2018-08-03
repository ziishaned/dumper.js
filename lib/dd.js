'use strict'

const inspect = require('./inspect')
const process = require('process')

function dd() {
    Array.prototype.slice.call(arguments).forEach((thing) => {
        console.log(inspect(thing))
    })

    process.exit(1)
}

module.exports = dd
