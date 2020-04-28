const _ = require('../../utils');
const def = require('../definition');

const loadArrays = (opts) => {

  const needed  = Object.keys(def).filter(key => (def[key].isArray === true)).filter(key => (_.isSet(opts[key])));
  const hasFile = needed.filter(key => (!_.isSet(opts[key]) && _.isSet(opts[`${key}File`])));

  if (needed.length !== hasFile.length) { return; }

  const missing = hasFile.filter(key => (!_.isFile(opts[`${key}File`])));
  if (missing.length > 0) {
    return missing.map(key => (`File does not exist for ${def[key].name.toLowerCase()}`));
  }

  const errors = [];

  needed.forEach(async (key) => {
    const lines = await _.readLines(opts[`${key}File`]);
    if (typeof lines === 'undefined') {
      errors.push(`Failed to ready file for ${def[key].name.toLowerCase()}`);
    } else {
      opts[key] = lines;
    }
  });

  if (opts.emptyLinesNew !== true && _.isValidArray(opts.newLines)) {
    opts.newLines = _.trimArray(opts.newLines);
  }
  if (opts.emptyLinesOld !== true && _.isValidArray(opts.oldLines)) {
    opts.oldLines = _.trimArray(opts.oldLines);
  }
  if (_.isValidArray(opts.ignorePatterns)) { 
    opts.ignorePatterns = opts.ignorePatterns.filter(_.isValidString).map(x => (x.trim()));
  }
  if (_.isValidArray(opts.searchPatterns)) { 
    opts.searchPatterns = opts.searchPatterns.filter(_.isValidString).map(x => (x.trim()));
  }

  return errors;
};

module.exports = loadArrays;
