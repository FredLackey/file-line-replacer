const _ = require('../../utils');

const destinationFile = opts => {

  if (_.isSet(opts.destinationFile)) {

    if (_.isSet(opts.destinationDir)) {
      return 'Destination file and destination directory cannot be used together.';
    }  
    if (_.isFile(opts.destinationFile) && opts.overwrite !== true) {
      return 'Destination file exists and overwrite is not set to allow.';
    }

  } else {

    if (_.isSet(opts.sourceFile)) {
      return 'Source file requires destination file.';
    }  

  }

  return null;
};

module.exports = destinationFile;
