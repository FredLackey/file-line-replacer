const _ = require('../../utils');
const path = require('path');
const def = require('../definition');

const normalize = value => {
  if (!_.isValidString(value)) { return null; }
  let result = null;
  try {
    if (value.indexOf(':') === 1 || value.startsWith('\\\\')) {
      result = path.win32.normalize(value);
    } else {
      result = path.normalize(value);
    }
    result = path.resolve(value);
  } catch (ex) {
    if (process.env.NODE_DEBUG) {
      console.error(ex);
    }
  }
  return result;
};

const cleanDirs = opts => {

  const errors = [];

  Object.keys(def)
    .filter(key => (def[key].isPath))
    .filter(key => (_.isSet(opts[key])))
    .forEach(key => {

      const errMsg = `Could not validate ${def[key].name.toLowerCase()}.`;

      if (_.isValidArray(opts[key])) {
        for (let i = 0; i < opts[key].length; i += 1) {
          opts[key][i] = normalize(opts[key][i]);
          if (!_.isValidString(opts[key][i])) {
            errors.push(errMsg);
          }
        }
      } else {
        opts[key] = normalize(opts[key]);
        if (!_.isValidString(opts[key])) {
          errors.push(errMsg);
        }
      }

    });

  return errors;
};

module.exports = cleanDirs;
