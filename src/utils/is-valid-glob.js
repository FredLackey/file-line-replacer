const _isValidGlob  = require('is-valid-glob');
const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');

const isValidGlob = (value) => {
  try {
    return (isValidString(value) || isValidArray(value)) && _isValidGlob(value);
  } catch (ex) {
    return false;
  }
};

module.exports = isValidGlob;
