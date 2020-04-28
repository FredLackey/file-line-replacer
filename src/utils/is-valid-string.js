const isSet = require('./is-set');

const isValidString = (value, isEmptyOkay) => {
  return (typeof value === 'string') && (isEmptyOkay || value.trim().length > 0);
};

const isValidStringIfSet = (value, isEmptyOkay) => {
  return !isSet(value) || isValidString(value, isEmptyOkay);
};

module.exports = {
  isValidString,
  isValidStringIfSet
};
