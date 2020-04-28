const _ = require('../../utils');

const ignorePatternsFile = opts => {
  if (!_.isSet(opts.ignorePatternsFile)) { return null; }
  if (_.isSet(opts.ignorePatterns)) {
    return 'Ignore patterns and ignore patterns file cannot be used together.';
  }
  if (!_.isFile(opts.ignorePatternsFile)) {
    return 'Ignore patterns file does not exist.';
  }
  return null;
};

module.exports = ignorePatternsFile;
