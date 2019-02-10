const CallerId = require('caller-id');
const Dumper   = require('./src/dumper');

function dump() {
  const dumper = new Dumper();
  let caller   = CallerId.getData();

  if (caller.functionName === 'dd') {
    caller = CallerId.getData(dd);
  }

  // Print the file path, line number and generated dump
  console.log(`${caller.filePath}:${caller.lineNumber}:`);

  for (const obj of arguments) {
    console.log(dumper.generateDump(obj));
  }
}

function dd() {
  dump(...arguments);

  process.exit();
}

module.exports = {dd, dump};
