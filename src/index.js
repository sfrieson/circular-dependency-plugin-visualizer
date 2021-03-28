const combineFns = require("../util/combine-functions");
const makeVisualizer = require("./visualizer");

module.exports = function (pluginConfig, visualizationConfig) {
  const userConfig = pluginConfig || {};
  const visualizer = makeVisualizer(userConfig, visualizationConfig);
  const config = {
    ...userConfig,
    ...{
      onStart: combineFns(visualizer.onStart, userConfig.onStart),
      onDetected: combineFns(visualizer.onDetected, userConfig.onDetected),
      onEnd: combineFns(visualizer.onEnd, userConfig.onEnd),
    },
  };
  return config;
};
