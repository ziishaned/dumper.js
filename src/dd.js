/* eslint-disable no-console */
const callerId = require('caller-id');

const Dumper = require('./dumper');

function dd(obj) {
  const dumper = new Dumper();
  const caller = callerId.getData();

  // Print the file path, line number and generated dump
  console.log(`${caller.filePath}:${caller.lineNumber}:`);
  console.log(dumper.generateDump(obj));

  process.exit(0);
}

module.exports = dd;
