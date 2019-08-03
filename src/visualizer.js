const path = require('path');

const render = require('./view/render');
const write = require('./write');
const PLUGIN_ERROR = 'Circular dependency detected:\r\n';

module.exports = function makeVisualizer (userPluginConfig, inputConfig) {
  const files = {};
  const imports = {};

  const config = {
    filepath: path.join(process.cwd(), 'circular-dependency-visualization.html'),
    ...inputConfig
  };
  return {
    onStart () { },
    onDetected ({ /* module: webpackModuleRecord, */ paths, compilation }) {
      paths.forEach(function (path, i) {
        if (!(path in files)) {
          files[path] = {
            id: path,
            value: 20,
            group: path.split('/')[0],
            radius: 5
            // dependencies: webpackModuleRecord.dependencies
          };
        }

        if (paths[i + 1]) {
          const importedPath = paths[i + 1];
          const importId = `${path}->${importedPath}`;
          imports[importId] = {
            id: importId,
            source: path,
            target: importedPath
          }
        }
      });

      // Recreate plugin functionality of logging only if no onDetected is supplied.
      if (!userPluginConfig.onDetected) {
        let error = new Error(PLUGIN_ERROR.concat(paths.join(' -> ')))
        if (userPluginConfig.failOnError) {
          compilation.errors.push(error)
        } else {
          compilation.warnings.push(error)
        }
      }
    },
    onEnd ({ compilation }) {
      write(config.filepath, render({
        nodes: Object.values(files),
        links: Object.values(imports)
      }));
      compilation.warnings.push('Circular dependency visulization output to:\r\n' + config.filepath);
    }
  }
};
