const MarkdownIt = require("markdown-it");
const brewdown = require("./brewdown");

let md = new MarkdownIt().use(brewdown);

const result = md.render(`

# Brewdown

Paragraph starts here.
This is a new line.

This is a new paragraph.

## Second Heading

Random paragraph text goes here.

### Third Heading

Random paragraph text goes here.

#### Fourth Heading

Random paragraph text goes here.

##### Fifth Heading

Random paragraph text goes here.

##### Sixth Heading

Random paragraph text goes here.

\`\`\`description
# Read Aloud
Read this text aloud!

Second paragraph here.
\`\`\`

\`\`\`note
# Read Aloud
Read this text aloud!

Second paragraph here.
\`\`\`

`);

console.log(result);