module.exports = function (md) {
  const options = {
    marker: "\""
  };
  md.use(require("markdown-it-container"), "description", options);
  md.use(require("markdown-it-container"), "note", options);
  md.options.breaks = true;
};