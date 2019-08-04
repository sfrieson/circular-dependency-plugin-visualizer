const noop = () => null;
module.exports = {
  writeFileSync: noop,
  readFileSync: (filename) => 'File: ' + filename
};
