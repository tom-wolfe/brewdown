const MarkdownIt = require("markdown-it");
const brewdown = require("./brewdown");

let md = new MarkdownIt().use(brewdown);

const toRender = "face /page shploo";

const result = md.render(toRender);

console.log(result);