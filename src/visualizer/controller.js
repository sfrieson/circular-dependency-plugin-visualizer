const pluginLogging = require("../plugin-logging");
const render = require("../view/render");
const write = require("../write");

module.exports = function makeController(pluginConfig, config, model) {
  const controller = {
    addDependency(source, target) {
      if (target) model.addImport(`${source}->${target}`, source, target);
    },
    addFile(path) {
      model.addFile(path, {
        id: path,
        value: 20,
        group: path.split("/")[0],
        radius: 5,
      });
    },
    config,
    generateVisualization() {
      write(
        this.config.filepath,
        render(this.getData(), this.config)
      );
      return this.config.filepath;
    },
    getData() {
      return {
        files: model.getFiles(),
        imports: model.getImports(),
      };
    },
    getConfig() {
      return {
        onStart() {},
        onDetected({ paths, compilation }) {
          controller.recordPaths(paths);

          // Recreate plugin functionality of logging only if no onDetected is supplied.
          pluginLogging(pluginConfig, paths, compilation);
        },
        /** Creates the visualization with the current runs data, warning about it only if there are cycles. */
        onEnd({ compilation }) {
          const filepath = controller.generateVisualization();

          const dependencyFileCount = Object.keys(model.getFiles()).length;
          if (dependencyFileCount == 0) {
            return;
          }
          compilation.warnings.push(
            "Circular dependency visulization output to:\r\n" + filepath
          );
        },
      };
    },
    recordPaths(paths) {
      paths.forEach(function (path, i) {
        controller.addFile(path);
        controller.addDependency(path, paths[i + 1]);
      });
    },
  };

  return controller;
};
