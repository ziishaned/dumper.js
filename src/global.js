/* eslint-disable no-console */
const callerId = require('caller-id');

let Dumper = require('./dumper');

const log = console.log;
console.log = dump;

function dump(obj) {
  const dumper = new Dumper();
  const caller = callerId.getData();

  // Print the file path, line number and generated dump
  log(`${caller.filePath}:${caller.lineNumber}:`);
  log(dumper.generateDump(obj));
}

module.exports = dump;
