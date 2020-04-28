const { isValidString } = require('./is-valid-string');

const isAlpha = value => {
  return isValidString(value) && 
    value
      .toLowerCase()
      .split('')
      .filter(ch => ('abcdefghijklmnopqrstuvwxyz'.includes(ch))).join('') === value.toLowerCase();
};

module.exports = isAlpha;
