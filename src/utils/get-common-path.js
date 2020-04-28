const path = require('path');
const { isValidArray } = require('./is-valid-array');
const { isValidString } = require('./is-valid-string');
const getSubstring = require('./get-substring');

const getRoot = values => {
  if (!isValidArray(values)) { 
    return null; 
  }
  const result = [];
  values.forEach(value => {
    try {
      const { root } = path.parse(value);
      if (!result.includes(root)) { 
        result.push(root); 
      }
    } catch (ex) {
      return null;
    }
  });
  return (result.length === 1) ? result[0] : null;
};

const getBaseDir = (values) => {
  
  if (!isValidArray(values)) { 
    return null; 
  }
  if (values.length === 1) { 
    return values[0]; 
  }
  const root = getRoot(values);
  if (!isValidString(root)) {
    return null;
  }
  const endChar = (root.length === 3 && root.endsWith(':\\')) 
    ? '\\'
    : (root.length === 1)
      ? root
      : (root === '\\\\')
        ? '\\\\'
        : undefined;
  if (!isValidString(endChar)) {
    return null;
  }
  const _dirs = values
    .filter(value => (value.toLowerCase().startsWith(root)))
    .map(value => (value.endsWith(endChar) ? value : (value + endChar)));
  if (_dirs.length !== values.length) {
    return null;
  }
  let substring = getSubstring(_dirs, true);
  while (isValidString(substring) && !substring.endsWith(endChar)) {
    if (substring === endChar) { 
      substring = ''; 
    }
    else {
      substring = substring(0, substring.length - 1);
    }
  }
  return substring;
};

module.exports = getBaseDir;
