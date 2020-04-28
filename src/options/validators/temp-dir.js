const _ = require('../../utils');

const tempDir = opts => {
  if (!_.isSet(opts.tempDir)) { return null; }
  if (!_.isDirectory(opts.tempDir) && opts.makeDirs !== true) {
    return 'Temp directory does not exist and supplied options do not allow for making directories.';
  }
  return null;
};

module.exports = tempDir;
