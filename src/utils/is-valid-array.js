const isSet = require('./is-set');

const isValidArray = (value, isEmptyOkay) => {
  return (typeof value === 'object') && (value instanceof Array) && (isEmptyOkay || value.length > 0);
};

const isValidArrayIfSet = (value, isEmptyOkay) => {
  return !isSet(value) || isValidArray(value, isEmptyOkay);
};

module.exports = {
  isValidArray,
  isValidArrayIfSet
};
