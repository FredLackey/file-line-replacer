const getPads = line => {
  const results = { prefix: 0, suffix: 0 };
  if (typeof line !== 'string') { return results; }
  const chars = line.split('');
  let lastCharPos = -1;
  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i] !== ' ') { lastCharPos = i; continue; }
    if (lastCharPos < 0) { results.prefix += 1; continue; }
    if (lastCharPos === (i - 1)) { results.suffix = 1; continue; }
    results.suffix += 1;
  }
  return results;
};

module.exports = getPads;
