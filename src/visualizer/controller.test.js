const makeController = require("./controller");
jest.mock("fs");
let pluginConfig;
let config;
let model;
beforeEach(() => {
  pluginConfig = {};
  config = {};
  model = {
    addFile: jest.fn(),
    addImport: jest.fn(),
    getFiles: jest.fn(() => ({})),
    getImports: jest.fn(),
  };
});

it("returns circular-dependency-plugin config options", () => {
  const controller = makeController(pluginConfig, config, model);
  const outputConfig = controller.getConfig();

  expect(outputConfig).toHaveProperty("onStart");
  expect(outputConfig).toHaveProperty("onDetected");
  expect(outputConfig).toHaveProperty("onEnd");
});
it("calls `recordPaths` when cyclical dependency is detected", () => {
  const controller = makeController(pluginConfig, config, model);
  controller.recordPaths = jest.fn();
  const paths = ["a.js", "b.js", "c.js", "a.js"];
  const compilation = { warnings: [] };
  controller.getConfig().onDetected({ paths, compilation });
  expect(controller.recordPaths).toHaveBeenCalled();
  expect(controller.recordPaths.mock.calls[0][0]).toBe(paths);
});
it("adds dependencies to the model", () => {
  const controller = makeController(pluginConfig, config, model);
  controller.addDependency("a.js", "b.js");
  expect(model.addImport).toHaveBeenCalled();
  controller.addDependency("a.js");
  expect(model.addImport).toHaveBeenCalledTimes(1);
});
it("adds a file to the model", () => {
  const filename = "a.js";
  makeController(pluginConfig, config, model).addFile(filename);
  expect(model.addFile).toHaveBeenCalled();
  expect(model.addFile.mock.calls[0][0]).toBe(filename);
  expect(model.addFile.mock.calls[0][1]).toHaveProperty("id", filename);
});
it("adds a file and dependency for each path it records", () => {
  const paths = ["a.js", "b.js", "c.js", "a.js"];
  const controller = makeController(pluginConfig, config, model);
  controller.addFile = jest.fn();
  controller.addDependency = jest.fn();
  controller.recordPaths(paths);
  expect(controller.addFile).toHaveBeenCalledTimes(paths.length);
  expect(controller.addDependency).toHaveBeenCalledTimes(paths.length);
});
it("returns data in an object", () => {
  const data = makeController(pluginConfig, config, model).getData();
  expect(typeof data).toBe("object");
  expect(data).toHaveProperty("files");
  expect(data).toHaveProperty("imports");
  expect(model.getFiles).toHaveBeenCalled();
  expect(model.getImports).toHaveBeenCalled();
});
it("generates the visualization at the end", () => {
  const controller = makeController(pluginConfig, config, model);
  controller.generateVisualization = jest.fn();
  controller.getConfig().onEnd({ compilation: { warnings: [] } });
  expect(controller.generateVisualization).toHaveBeenCalled();
});
it("returns the filepath from the visualization generation", () => {
  config.filepath = "./src/file.js";
  const controller = makeController(pluginConfig, config, model);
  expect(controller.generateVisualization()).toBe(config.filepath);
});

it("does not warn about the outfile if there are no cycles", () => {
  const controller = makeController(pluginConfig, config, model);
  const compilation = { warnings: [] };
  controller.getConfig().onEnd({ compilation });
  expect(compilation.warnings).toHaveLength(0);
});

it("warns about the outfile", () => {
  model.getFiles = () => ({ "a.js": {}, "b.js": {} });
  config.filepath = "foo.html";
  const controller = makeController(pluginConfig, config, model);

  const compilation = { warnings: [] };
  controller.getConfig().onEnd({ compilation });
  expect(compilation.warnings).toHaveLength(1);
  expect(compilation.warnings[0]).toMatch(config.filepath);
});
