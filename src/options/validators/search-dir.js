const _ = require('../../utils');

const searchDir = opts => {

  if (_.isSet(opts.searchDir)) {

    if (!_.isDirectory(opts.searchDir)) {
      return 'Search directory does not exist.';
    }

    return null;

  } 

    if (!_.isSet(opts.sourceFile)) {
      return 'Either source file or search directory must be supplied.';
    }

  

};

module.exports = searchDir;
