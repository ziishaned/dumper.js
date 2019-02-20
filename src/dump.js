/* eslint-disable no-console */
const callerId = require('caller-id');
const kleur = require('kleur');
const Dumper = require('./dumper');

function dump(obj) {
  const dumper = new Dumper();
  const caller = callerId.getData();
  let callerInfo = `${caller.filePath}:${caller.lineNumber}`;

  if (caller.functionName) callerInfo = `${callerInfo}:${caller.functionName}()`;
  if (caller.methodName) callerInfo = `${callerInfo}:${caller.methodName}()`;

  // Print the file path, line number and generated dump
  console.log(kleur.bold(callerInfo));
  console.log();
  console.log(dumper.generateDump(obj));
  console.log();
}

module.exports = dump;
