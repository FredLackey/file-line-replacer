const _ = require('../../utils');

const newLinesFile = opts => {

  if (_.isSet(opts.newLinesFile)) {

    if (_.isSet(opts.newLines)) {
      return 'New lines and new lines file cannot be used together.';
    }

    if (!_.isFile(opts.newLinesFile)) {
      return 'New lines file does not exist.';
    }

    return null;
  
  } 

    if (!_.isSet(opts.newLines)) {
      return 'Either new lines or new lines file must be supplied.';
    }

    return null;
  
  

};

module.exports = newLinesFile;
