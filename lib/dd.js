let Dump = require('./dump');
const callerId = require('caller-id');

function dd(obj) {
    const dump = new Dump();

    const caller = callerId.getData();
    console.log(`${caller.filePath}:${caller.lineNumber}:`);

    console.log(`${dump.start(obj)}`);
    process.exit(0);
}

module.exports = dd;
