const _ = require('../../utils');

const searchPatternsFile = opts => {
  if (!_.isSet(opts.searchPatternsFile)) { return null; }
  if (_.isSet(opts.searchPatterns)) {
    return 'Search patterns and search patterns file cannot be used together.';
  }
  if (!_.isFile(opts.searchPatternsFile)) {
    return 'Search patterns file does not exist.';
  }
  return null;
};

module.exports = searchPatternsFile;
