/* eslint-disable no-console */
const callerId = require('caller-id');

const Dumper = require('./dumper');

// Temporarily store console.log function
const log = console.log;

// Override console.log with dump
console.log = dump;

function dump(obj) {
  const dumper = new Dumper();
  const caller = callerId.getData();

  // Print the file path, line number and generated dump
  log(`${caller.filePath}:${caller.lineNumber}:`);
  log(dumper.generateDump(obj));

  // Revert console.log back to original function
  console.log = log;
}
