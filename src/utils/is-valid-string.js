const isValidString = (value, isEmptyOkay) => {
  return (typeof value === 'string') && (isEmptyOkay || value.trim().length > 0);
};

module.exports = isValidString;
