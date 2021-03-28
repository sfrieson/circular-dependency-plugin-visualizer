const path = require("path");

const makeController = require("./controller");
const makeModel = require("./model");

module.exports = function makeVisualizer(userPluginConfig, inputConfig) {
  const config = {
    filepath: path.join(
      process.cwd(),
      "circular-dependency-visualization.html"
    ),
    ...inputConfig,
  };
  const controller = makeController(userPluginConfig, config, makeModel());
  return controller.getConfig();
};
