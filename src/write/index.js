const fs = require("fs");

module.exports = function write(filepath, data) {
  fs.writeFileSync(filepath, data);
};
