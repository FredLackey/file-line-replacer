const { isValidArray } = require('./is-valid-array');

const getSubstring = (values, isCaseSensitive = true) => {
  if (!isValidArray(values)) { return null; }
  if (values.length === 1) { return values[0]; }

  let maxLength = -1;
  values.forEach(value => {
    if (value.length > maxLength) {
      maxLength = value.length;
    }
  });

  const example = values.filter(value => (value.length === maxLength))[0];
  let lastValue = '';

  example.split('').forEach(ch => {
    const curValue = lastValue + ch;
    const matches = values.filter(value => (
      (isCaseSensitive && value.startsWith(curValue)) ||
      (!isCaseSensitive && value.toLowerCase().startsWith(curValue.toLowerCase()))));
    if (matches.length !== values.length) {
      return lastValue;
    }
    lastValue = curValue;
  });

  return lastValue;
};

module.exports = getSubstring;
