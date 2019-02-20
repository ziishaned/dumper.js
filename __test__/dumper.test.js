const Dumper = require('../src/dumper');

describe('Dump class tests', () => {
  generateDump = (item) => {
    const dumper = new Dumper();
    return dumper.generateDump(item).replace(/\u001b\[.*?m/g, '');
  };

  it('can dump strings', () => {
    const stringsToTest = ['list of strings', '', ' '];

    stringsToTest.forEach((toTest) => {
      const actualDump = generateDump(toTest);
      const expectedDump = `string "${toTest}" (length=${toTest.length})`;

      expect(actualDump).toStrictEqual(expectedDump);
    });
  });

  it('can dump boolean values', () => {
    expect(generateDump(true)).toStrictEqual('boolean true');
    expect(generateDump(false)).toStrictEqual('boolean false');
  });

  it('can dump numeric values', () => {
    const numbers = [23, 2, 0, 11.1, -1, -12.2, -9.22, -0.9];

    numbers.forEach((number) => {
      const type = Number.isInteger(number) ? 'int' : 'float';
      expect(generateDump(number)).toStrictEqual(`${type} ${number}`);
    });
  });

  it('can dump regex values', () => {
    expect(generateDump(/[0-9]+/)).toStrictEqual('/[0-9]+/');
  });

  it('can dump function values inside object', () => {
    const users = [
      {user: 'barney', age: 36, active: true, getAge: () => this.age},
      {user: 'fred', age: 40, active: false, getAge: () => this.age},
      {user: 'pebbles', age: 1, active: true, getAge: () => this.age},
    ];

    const expectedOutput = `array (size=3) [
    [0] => object (size=4) {
        'user' => string "barney" (length=6),
        'age' => int 36,
        'active' => boolean true,
        'getAge' => () => this.age,
    },
    [1] => object (size=4) {
        'user' => string "fred" (length=4),
        'age' => int 40,
        'active' => boolean false,
        'getAge' => () => this.age,
    },
    [2] => object (size=4) {
        'user' => string "pebbles" (length=7),
        'age' => int 1,
        'active' => boolean true,
        'getAge' => () => this.age,
    },
]`;

    expect(generateDump(users)).toStrictEqual(expectedOutput);
  });

  it('can dump null values', () => {
    expect(generateDump(null)).toStrictEqual('null');
  });

  it('can dump undefined values', () => {
    expect(generateDump(undefined)).toStrictEqual('undefined');
  });

  it('can dump array values', () => {
    const weekdays = [
      'sunday',
      'monday',
      1,
      true,
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      null,
      false,
    ];

    const expectedOutput = `array (size=11) [
    [0] => string "sunday" (length=6),
    [1] => string "monday" (length=6),
    [2] => int 1,
    [3] => boolean true,
    [4] => string "tuesday" (length=7),
    [5] => string "wednesday" (length=9),
    [6] => string "thursday" (length=8),
    [7] => string "friday" (length=6),
    [8] => string "saturday" (length=8),
    [9] => null,
    [10] => boolean false,
]`;

    expect(generateDump(weekdays)).toStrictEqual(expectedOutput);
  });

  it('can dump object values', () => {
    const carDetails = {
      color: 'red',
      wheels: 4,
      engine: {
        cylinders: 4,
        size: 2.2,
      },
    };

    const expectedOutput = `object (size=3) {
    'color' => string "red" (length=3),
    'wheels' => int 4,
    'engine' => object (size=2) {
        'cylinders' => int 4,
        'size' => float 2.2,
    },
}`;

    expect(generateDump(carDetails)).toStrictEqual(expectedOutput);
  });

  it('can dump cycled object', () => {
    const mainNode = {};
    const rightNode = {
      left: mainNode,
      right: null,
    };
    mainNode.left = mainNode;
    mainNode.right = rightNode;

    const expectedOutput = `object (size=2) {
    'left' => object (size=1) {
        '$ref' => string "$" (length=1),
    },
    'right' => object (size=2) {
        'left' => object (size=1) {
            '$ref' => string "$" (length=1),
        },
        'right' => null,
    },
}`;

    expect(generateDump(mainNode)).toStrictEqual(expectedOutput);
  });

  it('can dump object without hasOwnProperty', () => {
    const weirdObject = {
      hasOwnProperty: null,
    };

    const expectedOutput = `object (size=1) {
    'hasOwnProperty' => null,
}`;

    expect(generateDump(weirdObject)).toStrictEqual(expectedOutput);
  });
});
