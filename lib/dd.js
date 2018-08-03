let Dump = require('./dump');

function dd(obj) {
    let dump = new Dump();
    console.log(dump.start(obj));
}

module.exports = dd;
