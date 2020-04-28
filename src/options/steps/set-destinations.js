const glob = require('glob');
const path = require('path');
const _ = require('../../utils');

const setDestinations = opts => {

  if (!_.isValidArray(opts._files)) { 
    return; 
  }

  if (_.isSet(opts.destinationFile)) {
    if (opts._files.length === 1) {
      opts._files[0].out = opts.destinationFile;
      return;
    }
    return ['Cannot set the same destination file for multiple sources.'];
  }

  if (!_.isSet(opts.destinationDir)) {
    opts._files.forEach(file => {
      file.out = file.in;
    });
    return;
  }

  const dirs = opts._files.map(file => (path.dirname(file.in)));
  const baseDir = _.getCommonPath(dirs);
  if (!_.isValidString(baseDir)) {
    return ['Cannot determine base directory for output.'];
  }

  opts._files.forEach(file => {
    const relFilePath = file.in.substr(baseDir.length);
    file.out = path.join(opts.destinationDir, relFilePath);
  });

  return [];
};

module.exports = setDestinations;
