module.exports = function (md) {

  const NAME = "column_break";

  function rule(state) {
    const blockTokens = state.tokens;

    for (let j = 0, l = blockTokens.length; j < l; j++) {
      if (blockTokens[j].type !== "inline" || blockTokens[j].content.indexOf("/column") < 0) {
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

        if (currentToken.type === "text" && currentToken.content.indexOf("/column") > -1) {
          const nodes = [];
          const level = currentToken.level;
          const parts = currentToken.content.split("/column");
          parts.forEach((part, idx) => {
            if (part) {
              const token = new state.Token("text", "", 0);
              token.content = part;
              token.level = level;
              nodes.push(token);
            }
            if (idx < parts.length - 1) {
              const columnBreak = new state.Token(NAME, "", 0);
              columnBreak.content = "/column";
              columnBreak.level = level;
              nodes.push(columnBreak);
            }
          });

          // replace current node
          blockTokens[j].children = tokens = state.md.utils.arrayReplaceAt(tokens, i, nodes);
        }
      }
    }
  };

  md.core.ruler.push(NAME, rule);
  md.renderer.rules[NAME] = () => "\n<div class=\"col-break\"></div>\n";
};