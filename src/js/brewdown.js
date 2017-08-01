const columnBreak = require("./rules/columnBreak");
const lists = require("./rules/lists");
const pageBreak = require("./rules/pageBreak");
const textBlock = require("./rules/textBlock");

const brewdown = (md) => {
  md.use(pageBreak);
  md.use(columnBreak);
  md.use(textBlock);
  md.use(lists);
};

module.exports = brewdown;