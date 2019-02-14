const {dd} = require('../index');
const {dump} = require('../index');

describe('dump helpers', () => {
  it('should be variadic', () => {
    const log = jest.spyOn(console, 'log').mockImplementation((any) => any);

    dump(1, 'a', {b: 2});

    expect(log).toHaveBeenCalled();
    expect(log.mock.calls.length).toBe(2);
  });

  it('should not exit the process when dump method called', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation((number) => number);

    dump(1);

    expect(exit).not.toHaveBeenCalled();
  });

  it('should kill the process when dd method called', () => {
    const exit = jest.spyOn(process, 'exit').mockImplementation((number) => number);

    dd(1);

    expect(exit).toHaveBeenCalled();
  });
});
