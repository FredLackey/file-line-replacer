const COL_DELIM = '|';
const LINE_CHAR = '-';

const getColumnWidths = (lines, delimiter) => {
  const results = [];
  lines.forEach(line => {
    const parts = line.split(delimiter);
    for (let i = 0; i < parts.length; i += 1) {
      const { length } = parts[i].trim();
      if (results.length < (i + 1)) {
        results.push(length);
      } else if (results[i] < length) {
        results[i] = length;
      }
    }
  });
  return results;
};

const addHeader = cache => {
  const parts = [];
  cache.widths.forEach(width => {
    parts.push(''.padEnd(width + 2, LINE_CHAR));
  });
  const line = COL_DELIM + parts.join(COL_DELIM) + COL_DELIM;
  cache.lines.push(line);
};

const addLine = (cache, lineParts) => {
  const parts = [];
  for (let i = 0; i < lineParts.length; i += 1) {
    const value = lineParts[i].trim().padEnd(cache.widths[i]);
    parts.push(` ${value} `);
  }
  cache.lines.push(COL_DELIM + parts.join(COL_DELIM) + COL_DELIM);
};

const toTable = (lines, delimiter) => {
  const cache = {
    widths  : getColumnWidths(lines, delimiter),
    lines   : []
  };
  lines.forEach(line => {
    if (cache.lines.length === 1) {
      addHeader(cache);
    }
    addLine(cache, line.split(delimiter));
  });

  return cache.lines;
};

module.exports = toTable;
