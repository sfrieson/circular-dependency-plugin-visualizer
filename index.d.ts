import CircularDependencyPlugin from "circular-dependency-plugin";

declare interface VisualizationConfig {
  filepath: string;
}

declare function circularDependencyVisualizer(
  pluginConfig: CircularDependencyPlugin.Options,
  visualizationConfig: VisualizationConfig
): CircularDependencyPlugin.Options;

export default circularDependencyVisualizer;
