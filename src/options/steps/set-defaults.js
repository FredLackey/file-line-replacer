const def = require('../definition');

const setDefaults = (opts) => {

  const errors = [];

  try {
    Object.keys(def)
      .filter(key => (
        ['string', 'boolean'].includes(typeof def[key].default) &&
        (typeof opts[key] === 'undefined')))
      .forEach(key => {
        opts[key] = def[key].default;
      });
  } catch (ex) {
    errors.push('Problem assigning primative values.');
  }

  try {
    Object.keys(def)
    .filter(key => (
      (typeof def[key].default === 'function') &&
      (typeof opts[key] === 'undefined')))
    .forEach(key => {
      opts[key] = def[key].default(opts);
    });
  } catch (ex) {
    errors.push('Problem invoking default formatters.');
  }

  try {
    const toRemove = Object.keys(opts)
      .filter(key => (typeof opts[key] === 'undefined'));
    toRemove.forEach(key => {
      Reflect.deleteProperty(opts, key);
    });
  } catch (ex) {
    errors.push('Problem removing irrelevant options.');
  }

  return errors;
};

module.exports = setDefaults;
