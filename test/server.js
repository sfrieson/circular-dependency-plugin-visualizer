const path = require("path");

const express = require("express");

const PORT = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, "output")));

app.use(function (req, res) {
  res.send("hi");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
  console.log(`Visit:
  - http://localhost:${PORT}/out-40-nodes.html
  - http://localhost:${PORT}/out-empty.html
  - http://localhost:${PORT}/out-small.html
  `);
});
