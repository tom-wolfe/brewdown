const columnBreak = require("./rules/columnBreak");
const pageBreak = require("./rules/pageBreak");
const textBlock = require("./rules/textBlock");

const brewdown = (md) => {
  md.use(textBlock);
  md.use(columnBreak);
  md.use(pageBreak);
};

module.exports = brewdown;