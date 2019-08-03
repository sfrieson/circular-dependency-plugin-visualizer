jest.mock('fs');
const makeVisualizer = require('./visualizer');

it('returns an object with plugin methods', () => {
  const visualizer = makeVisualizer();
  expect(visualizer).toHaveProperty('onStart');
  expect(visualizer).toHaveProperty('onDetected');
  expect(visualizer).toHaveProperty('onEnd');
});

describe('recreates plugin onDetected functionality', () => {
  let paths;
  let compilation;
  beforeEach(() => {
    paths = ['a.js', 'b.js', 'c.js', 'a.js'];
    compilation = {
      warnings: {
        push: jest.fn()
      },
      errors: {
        push: jest.fn()
      }
    };
  });
  it('skips logging if onDetected is supplied', () => {
    let visualizer = makeVisualizer({ onDetected: () => null });
    visualizer.onDetected({ compilation, paths });
    expect(compilation.warnings.push).not.toHaveBeenCalled();

    visualizer = makeVisualizer({ onDetected: () => null, failOnError: true });

    visualizer.onDetected({ compilation, paths });
    expect(compilation.errors.push).not.toHaveBeenCalled();
  });
  it('shows warnings when onDetected is not supplied', () => {
    const visualizer = makeVisualizer({});
    visualizer.onDetected({ compilation, paths });
    expect(compilation.warnings.push).toHaveBeenCalled();
  });
  it('shows errorss when onDetected is not supplied and failOnError is supplied', () => {
    const visualizer = makeVisualizer({ failOnError: true });
    visualizer.onDetected({ compilation, paths });
    expect(compilation.errors.push).toHaveBeenCalled();
  });
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