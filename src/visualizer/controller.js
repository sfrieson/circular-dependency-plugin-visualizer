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
      write(this.config.filepath, render(this.getData()));
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
        onEnd({ compilation }) {
          const filepath = controller.generateVisualization();
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
