var visualizer = require('.');

describe('visualizer()', () => {
  test('it should return config', () => {
    expect(typeof (visualizer())).toBe('object');
    expect(typeof (visualizer({}))).toBe('object');
    expect(typeof (visualizer(null, {}))).toBe('object');
    expect(typeof (visualizer(false, {}))).toBe('object');
    expect(typeof (visualizer({}, {}))).toBe('object');
  });
});
