const _ = require('../../utils');

const sourceFile = opts => {

  if (_.isSet(opts.sourceFile)) {

    if (_.isSet(opts.searchDir) || _.isSet(opts.searchPatterns) || _.isSet(opts.searchPatternsFile)) {
      return 'Source file cannot be used while searching.';
    }

    if (!_.isFile(opts.sourceFile)) {
      return 'Source file does not exist.';
    }

    return null;
  
  } 

    if (!_.isSet(opts.searchDir)) {
      return 'Either source file or search directory must be supplied.';
    }

  

};

module.exports = sourceFile;
