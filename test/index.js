const path = require('path');
const visualizer = require('../src');
const empty = require('./data/empty');
const small = require('./data/small');
const s40 = require('./data/size-40');

const compilation = { warnings: [], errors: [] };

const config = visualizer({}, {
  filepath: path.join(__dirname, 'output.html')
});

s40.detected.forEach(paths => config.onDetected({ paths, compilation }));
config.onEnd({ compilation });