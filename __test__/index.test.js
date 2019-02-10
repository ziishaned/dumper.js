const dd = require('../index').dd;
const dump = require('../index').dump;

describe('dump helpers', () => {
  it('is variadic', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(any => any);
    dump(1, 'a', {b: 2});

    expect(log).toHaveBeenCalled();
    expect(log.mock.calls.length).toBe(3 + 1); // 1 for filepath
  });

  it('doesnt exit when dump called', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation(number => number);
    dump(1);

    expect(exit).not.toHaveBeenCalled();
  });

  it('does exit when dd called', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation(number => number);;
    dd(1);

    expect(exit).toHaveBeenCalled();
  });
});
