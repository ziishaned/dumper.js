/* eslint-disable no-console */
const assert = require('chai').assert;

const Dumper = require('../src/dumper');

describe('Dump class tests', () => {
  function generateDump(item) {
    const dumper = new Dumper();
    return dumper.generateDump(item).replace(/\u001b\[.*?m/g, '');
  }

  it('can dump strings', () => {
    const stringsToTest = [
      'list of strings',
      '',
      ' ',
    ];

    stringsToTest.forEach((toTest) => {
      const actualDump = generateDump(toTest);
      const expectedDump = `string "${toTest}" (length=${toTest.length})`;

      assert.equal(actualDump, expectedDump);
    });
  });

  it('can dump boolean values', () => {
    assert.equal(generateDump(true), 'boolean true');
    assert.equal(generateDump(false), 'boolean false');
  });

  it('can dump numeric values', () => {
    const numbers = [23, 2, 0, 11.1, -1, -12.2, -9.22, -0.9];

    numbers.forEach(number => {
      const type = Number.isInteger(number) ? 'int' : 'float';
      assert.equal(generateDump(number), `${type} ${number}`);
    });
  });

  it('can dump null/undefined values', () => {
    assert.equal(generateDump(null), ' null');
    assert.equal(generateDump(undefined), ' undefined');
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
    [9] =>  null,
    [10] => boolean false,
]`;

    assert.equal(generateDump(weekdays), expectedOutput);
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
    'engine' =>  object (size=2) {
        'cylinders' => int 4,
        'size' => float 2.2,
    },
}`;

    assert.equal(generateDump(carDetails), expectedOutput);
  });
});
