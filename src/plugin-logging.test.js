const pluginLoggin = require('./plugin-logging');

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
  pluginLoggin({ onDetected: () => null }, paths, compilation);
  expect(compilation.warnings.push).not.toHaveBeenCalled();

  pluginLoggin({ onDetected: () => null, failOnError: true }, paths, compilation);
  expect(compilation.errors.push).not.toHaveBeenCalled();
});
it('shows warnings when onDetected is not supplied', () => {
  pluginLoggin({}, paths, compilation)
  expect(compilation.warnings.push).toHaveBeenCalled();
});
it('shows errorss when onDetected is not supplied and failOnError is supplied', () => {
  pluginLoggin({ failOnError: true }, paths, compilation);
  expect(compilation.errors.push).toHaveBeenCalled();
});
