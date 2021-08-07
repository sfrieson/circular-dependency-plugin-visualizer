const path = require("path");
const fs = require("fs");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");
module.exports = function (data) {
  return html.replace("<!-- styles -->", `<style>${styles}</style>`).replace(
    "<!-- script -->",
    `<script>${script.replace(
      "/* data */",
      // Leading comma is because prettier removes trailing comma in source file
      "," + JSON.stringify({ nodes: data.files, links: data.imports })
    )}</script>`
  );
};
