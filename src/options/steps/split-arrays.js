const _ = require('../../utils');
const def = require('../definition');

const splitArrays = (opts) => {
  const arrays = Object.keys(def).filter(key => (def[key].isArray === true)).filter(key => (_.isSet(opts[key])));
  const missing = arrays.filter(key => (!_.isSet(opts[`${key}Delimiter`])));

  if (missing.length > 0) {
    return missing.map(key => (`Missing delimiter for ${def[key].name.toLowerCase()}`));
  }

  arrays.forEach(key => {
    const value = opts[key].split(opts[`${key}Delimiter`]);
    opts[key] = value;
  });
};

module.exports = splitArrays;
