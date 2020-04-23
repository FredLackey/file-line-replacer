const isSet = value => {
  return (value !== null && (typeof value !== 'undefined'));
};

module.exports = isSet;
