const _ = require('../../utils');

const destinationDir = opts => {

  if (_.isSet(opts.destinationDir)) {

    if (_.isSet(opts.destinationFile)) {
      return 'Destination file and destination directory cannot be used together.';
    }
    if (!_.isDirectory(opts.destinationDir) && opts.makeDirs !== true) {
      return 'Destination directory does not exist and supplied options do not allow for making directories.';
    }

    return null;

  } 

    return null;

  
};

module.exports = destinationDir;
