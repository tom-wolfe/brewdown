const fs = require("fs-extra");
const path = require("path");
const sass = require("node-sass");
const sassConfig = require("./sass.config");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

webpack(webpackConfig).run(() => {
  // Config complete.
});

// Copy styles and assets.
sass.render({ file: path.posix.join(sassConfig.entry.path, sassConfig.entry.filename) }, (err, result) => {
  if (err) {
    console.log("ERROR: ", err);
    return;
  }
  const options = { filter: src => !src.endsWith(".scss") };
  return fs.copy(sassConfig.entry.path, sassConfig.output.path, options).then(() => {
    return fs.writeFile(path.posix.join(sassConfig.output.path, sassConfig.output.filename), result.css);
  });
});

const filterFunc = (src) => {
  return src.indexOf(".") < 0 || src.endsWith(".html");
};

// Copy HTML files.
fs.copy("./src/", "./dist/", { filter: filterFunc }).then(() => {
  console.log("FACE");
});