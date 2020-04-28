const { isValidString } = require('./is-valid-string');

const trimTop = lines => {
  const result    = [];
  let lastValid = -1;
  for (let i = 0; i < lines.length; i += 1) {

    if (isValidString(lines[i])) {
      result.push(lines[i]);
      lastValid = i;
      continue;
    }

    if (lastValid >= 0) {
      result.push(lines[i]);
    }

  }

  return result;
};
const trimBottom = lines => {
  let _lines = [].concat(lines);
  _lines.reverse();
  _lines = trimTop(_lines);
  _lines.reverse();
  return _lines;
};
const trim = lines => {
  return trimBottom(trimTop(lines));
};

module.exports = {
  trim,
  trimBottom,
  trimTop
};
