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
const CircularDependencyPlugin = require('circular-dependency-plugin')
const visualizer = require('circular-dependency-plugin-visualizer')

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
}
```

### Options

| property | type | default |
| --- | --- | --- |
| filepath | string | `path.join(process.cwd(), 'circular-dependency-visualization.html')` |
