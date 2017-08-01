module.exports = function (md, options) {

  const defaultOptions = {
    pageSize: "a4"
  };
  options = Object.assign({}, defaultOptions, options);

  function createOpenPage(state) {
    const pageOpen = new state.Token("page_open", "div", 1);
    pageOpen.block = true;
    pageOpen.markup = "\"\"\"";
    pageOpen.attrPush(["class", "page " + options.pageSize]);
    return pageOpen;
  }

  function createClosePage(state) {
    const pageClose = new state.Token("page_close", "div", -1);
    pageClose.block = true;
    pageClose.markup = "\"\"\"";
    return pageClose;
  }

  const rule = state => {
    const blockTokens = state.tokens;

    blockTokens.splice(0, 0, createOpenPage(state));

    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline" || blockTokens[j].content.indexOf("/page") < 0) {
        continue;
      }

      let htmlLinkLevel = 0;
      let tokens = blockTokens[j].children;

      // We scan from the end, to keep position when new tags added.
      // Use reversed logic in links start/end match
      for (let i = tokens.length - 1; i >= 0; i--) {
        const currentToken = tokens[i];

        // Skip content of markdown links
        if (currentToken.type === "link_close") {
          i--;
          while (tokens[i].level !== currentToken.level && tokens[i].type !== "link_open") { i--; }
          continue;
        }

        // Skip content of html tag links
        if (currentToken.type === "html_inline") {
          if (state.md.utils.isLinkOpen(currentToken.content) && htmlLinkLevel > 0) { htmlLinkLevel--; }
          if (state.md.utils.isLinkClose(currentToken.content)) { htmlLinkLevel++; }
        }

        if (htmlLinkLevel > 0) { continue; }

        if (currentToken.type === "text" && currentToken.content.indexOf("/page") > -1) {
          const nodes = [];
          const level = currentToken.level;

          const parts = currentToken.content.split("/page");

          parts.forEach((part, idx) => {
            if (part) {
              const token = new state.Token("text", "", 0);
              token.content = part;
              token.level = level;
              nodes.push(token);
            }
            if (idx < parts.length - 1) {
              nodes.push(createClosePage(state, level));
              nodes.push(createOpenPage(state, level));
            }
          });

          // replace current node
          blockTokens[j].children = tokens = state.md.utils.arrayReplaceAt(tokens, i, nodes);
        }
      }
    }

    blockTokens.splice(blockTokens.length, 0, createClosePage(state));
  };

  md.core.ruler.push("page_break", rule);
};