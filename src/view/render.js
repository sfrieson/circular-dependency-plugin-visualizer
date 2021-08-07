const path = require("path");
const fs = require("fs");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = fs.readFileSync(path.join(__dirname, "script.js"), "utf8");
const styles = fs.readFileSync(path.join(__dirname, "styles.css"), "utf8");

module.exports = function (data, config) {
  const js = script
    .replace(
      "/* data */",
      JSON.stringify({ nodes: data.files, links: data.imports })
    )
    .replace(
        "/* config */",
        JSON.stringify(config)
    );

  return html
    .replace("<!-- styles -->", `<style>${styles}</style>`)
    .replace("<!-- script -->", `<script>${js}</script>`);
};
