# 🔄 Circular Dependency Plugin Visualizer

This package was made for use with the circular-dependency-plugin ([GitHub](https://github.com/aackerman/circular-dependency-plugin)|[npm](https://www.npmjs.com/package/circular-dependency-plugin)) to assist in making sense of your circular dependencies and aid in fixing them.

## Installation
Use a package installer like NPM to install the package and the peer dependency circular-dependency-plugin

```bash
npm i --save-dev circular-dependency-plugin circular-dependency-plugin-visualizer
```

## Usage

The visualizer takes [all the same options](https://github.com/aackerman/circular-dependency-plugin#basic-usage) as circular-dependency-plugin >=4.4.0 and an additional optional configuration object specific to the visualization.

```js
// webpack.config.js
const CircularDependencyPlugin = require('circular-dependency-plugin');
const visualizer = require('circular-dependency-plugin-visualizer');

module.exports = {
  entry: "./src/index",
  plugins: [
    new CircularDependencyPlugin(visualizer({
      exclude: /node_modules/,
      cwd: process.cwd()
    }, {
      filepath: path.join(__dirname, 'circular-dependency-visualization.html')
    }))
  ]
};
```

### Options

| property | type | default |
| --- | --- | --- |
| filepath | string | `path.join(process.cwd(), 'circular-dependency-visualization.html')` |

## Visualzation Notes

### Node names
You can hover over a node to show the file path.

### Node color
The nodes show different colors for the directory that they're in (up to 10 directories). If because of your directory set up, they are all in the same root directory, like `src`, try setting the `cwd` property in the circular-dependency-plugin options to the common root.
```js
// webpack.config.js
const path = require('path');

module.exports = {
  ...,
  plugins: [
    new CircularDependencyPlugin(visualizer({
      ...
      cwd: path.resolve(__dirname, 'src')
    })
  ]
};
```

### Stroke animations
The strokes between nodes are animating in the direction of the import, showing the direction of the dependency chain. If a.js imports b.js, you will see the animation go from the a.js node to the b.js node. This is also the same direction as the arrows from the circular-dependency-plugin.
```
a.js -> b.js
```