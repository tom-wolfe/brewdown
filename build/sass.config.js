const path = require("path");

module.exports = {
  entry: {
    filename: "styles.scss",
    path: path.resolve("src/styles")
  },
  output: {
    filename: "styles.css",
    path: path.resolve("dist/styles")
  }
};