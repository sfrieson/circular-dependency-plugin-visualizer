// Code copied from circular-dependency-plugin to recreate functionality
// if onDetected is not supplied.
// Copyright (c) 2016, Aaron Ackerman <theron17@gmail.com>
const BASE_ERROR = 'Circular dependency detected:\r\n';

module.exports = function (options, pathList, compilation) {
  if (!options.onDetected) {
    // mark warnings or errors on webpack compilation
    let error = new Error(BASE_ERROR.concat(pathList.join(' -> ')))
    if (options.failOnError) {
      compilation.errors.push(error)
    } else {
      compilation.warnings.push(error)
    }
  }
}
