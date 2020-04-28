const path = require('path');
const isSet = require('./is-set');
const { isValidString } = require('./is-valid-string');

const getBase = value => {
  try {
    return path.basename(value);
  } catch (ex) {
    return undefined;
  }
};

const isValidPath = (value) => {
  return isValidString(getBase(value));
};

const isValidPathIfSet = (value) => {
  return !isSet(value) || isValidPath(value);
};

module.exports = {
  isValidPath,
  isValidPathIfSet
};
