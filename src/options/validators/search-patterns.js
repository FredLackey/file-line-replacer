const _ = require('../../utils');

const searchPatterns = opts => {

  if (_.isSet(opts.searchPatterns)) {

    if (_.isSet(opts.searchPatternsFile)) {
      return 'Search patterns and search patterns file cannot be used together.';
    }

    if (!_.isValidGlob(opts.searchPatterns)) {
      return 'Search pattern is not a valid glob.';
    }

    return null;

  } 

    return null;

  

};

module.exports = searchPatterns;
