const CallerId = require('caller-id');
const Dumper   = require('./src/dumper');

function dump(obj) {
  const dumper = new Dumper();
  let caller   = CallerId.getData();

  if (caller.functionName === 'dd') {
    caller = CallerId.getData(dd);
  }

  // Print the file path, line number and generated dump
  console.log(`${caller.filePath}:${caller.lineNumber}:`);

  console.log(dumper.generateDump(obj));
}

function dd(obj) {
  dump(obj);

  process.exit();
}

module.exports = {dd, dump};
