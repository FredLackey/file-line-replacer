const { isValidString } = require('./is-valid-string');

const isDigits = value => {
  return isValidString(value) && 
    value
      .split('')
      .filter(ch => ('0123456789'.includes(ch))).join('') === value;
};

module.exports = isDigits;
