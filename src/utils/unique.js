const { isValidArray } = require('./is-valid-array');

const unique = (values, trim = true, caseSensitive = false) => {
  if (!isValidArray(values)) { return values; }
  const results = [];
  const cache   = [];
  values.forEach(value => {
    let _v = value;
    _v = trim ? _v.trim() : _v;
    _v = caseSensitive ? _v.toLowerCase() : _v;
    if (!cache.includes(_v)) {
      cache.push(_v);
      results.push(value);
    }
  });
  return results;
};

module.exports = unique;
