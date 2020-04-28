const _ = require('../../utils');

const oldLinesFile = opts => {

  if (_.isSet(opts.oldLinesFile)) {

    if (_.isSet(opts.oldLines)) {
      return 'Old lines and old lines file cannot be used together.';
    }

    if (!_.isFile(opts.oldLinesFile)) {
      return 'Old lines file does not exist.';
    }

    return null;
  
  } 

    if (!_.isSet(opts.oldLines)) {
      return 'Either old lines or old lines file must be supplied.';
    }

    return null;
  
  

};

module.exports = oldLinesFile;
