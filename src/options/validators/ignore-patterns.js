const _ = require('../../utils');

const ignorePatterns = opts => {

  if (_.isSet(opts.ignorePatterns)) {

    if (_.isSet(opts.ignorePatternsFile)) {
      return 'Ignore patterns and ignore patterns file cannot be used together.';
    }

    if (!_.isValidGlob(opts.ignorePatterns)) {
      return _.isValidString(opts.ignorePatterns, true)
      ? 'Ignore pattern is not a valid glob.'
      : 'Ignore patterns are not valid globs.';
    }

    return null;

  } 

    return null;

  

};

module.exports = ignorePatterns;
