/* eslint-disable no-console */
const callerId = require('caller-id');

let Dump = require('./dump');

function dd(obj) {
    const dump = new Dump();

    const caller = callerId.getData();
    console.log(`${caller.filePath}:${caller.lineNumber}:`);

    console.log(`${dump.start(obj)}`);
    process.exit(0);
}

module.exports = dd;
