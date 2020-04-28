const _ = require('../../utils');
const def = require('../definition');

const toYargsFormat = () => {
  const result = {};
  Object.keys(def).forEach(key => {
    result[`${_.toKebabCase(key)}`] = {
      describe: def[key].name,
      type: def[key].type
    };
  });
  return result;
};

module.exports = toYargsFormat;
