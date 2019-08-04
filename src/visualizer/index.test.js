jest.mock('fs');
const makeVisualizer = require('.');

it('returns a config object', () => {
  expect(typeof makeVisualizer()).toBe('object');
});

it('warns the output filename at the end', () => {
  const paths = ['a.js', 'b.js', 'c.js', 'a.js'];;
  const compilation = {
    warnings: {
      push: jest.fn()
    },
    errors: {
      push: jest.fn()
    }
  };

  const config = { filepath: 'abc.html' };
  const visualizer = makeVisualizer({}, config);
  visualizer.onEnd({ compilation });
  expect(compilation.warnings.push).toHaveBeenCalled();
  expect(compilation.warnings.push.mock.calls[0][0]).toMatch(config.filepath);
});