const wrapFence = (md, render) => function (tokens, idx, options, env, slf) {
  const token = tokens[idx];
  const info = token.info ? md.utils.unescapeAll(token.info).trim() : "";
  const langName = info ? info.split(/\s+/g)[0] : "";

  switch (langName.toLowerCase()) {
    case "description":
    case "descriptive":
    case "describe":
    case "readaloud":
    case "quote":
    case "quotation":
      return `<div class="description">\n${md.render(md.utils.escapeHtml(token.content))}</div>\n`;
    case "note":
      return `<div class="note">\n${md.render(md.utils.escapeHtml(token.content))}</div>\n`;
    default: return render(tokens, idx, options, env, slf);
  }
};

module.exports = function (md) {
  md.options.breaks = true;
  md.renderer.rules.fence = wrapFence(md, md.renderer.rules.fence);
};