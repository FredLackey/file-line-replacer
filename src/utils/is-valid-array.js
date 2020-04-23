const isValidArray = (value, isEmptyOkay) => {
  return (typeof value === 'object') && (value instanceof Array) && (isEmptyOkay || value.length > 0);
};

module.exports = isValidArray;
