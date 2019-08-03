const combineFns = require('./combine-functions');

it('returns a new function', () => {
  expect(typeof combineFns(() => null)).toBe('function')
});

it('calls all combined functions', () => {
  const a = jest.fn();
  const b = jest.fn();
  combineFns(a, b)();
  expect(a).toHaveBeenCalled();
  expect(b).toHaveBeenCalled();
});

it('calls combined functions with all arguments', () => {
  const args = [1, 2, 3];
  const fn1 = function (a, b, c) {
    expect(a).toBe(args[0]);
    expect(b).toBe(args[1]);
    expect(c).toBe(args[2]);
  };
  const fn2 = function (a, b, c) {
    expect(a).toBe(args[0]);
    expect(b).toBe(args[1]);
    expect(c).toBe(args[2]);
  };
  combineFns(fn1, fn2)(...args);
});

it('only calls functions', function () {
  combineFns(() => null, false)();
});