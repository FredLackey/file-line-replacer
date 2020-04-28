const isSet = require('./is-set');

const isBoolean = value => {
  return (value === true) || (value === false);
};

const isBooleanIfSet = value => {
  return !isSet(value) || isBoolean(value);
};

module.exports = { isBoolean, isBooleanIfSet };
