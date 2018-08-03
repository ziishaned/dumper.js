let Dump = require('./dump');
const callerId = require('caller-id');

function dd(obj) {
    const caller = callerId.getData();
    const dump = new Dump();

    console.log(`${caller.filePath}:${caller.lineNumber}:`);
    console.log(`${dump.start(obj)}`);
    process.exit(0);
}

module.exports = dd;
