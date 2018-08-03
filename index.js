let dd = require('./lib/dd');

const obj = {
    foo: 'foo',
    bar: {
        foo: true,
        bar: null,
        baz: function () {
            alert('Hello');
        },
    },
    qux: [1.02, 3, 2, 'qwerty', 55],
    quxx: /^[0-9]/,
};

dd(obj);
