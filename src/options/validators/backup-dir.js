const _ = require('../../utils');

const backupDir = opts => {
  if (!_.isSet(opts.backupDir)) { return null; }
  if (!_.isDirectory(opts.backupDir) && opts.makeDirs !== true) {
    return 'Backup directory does not exist and supplied options do not allow for making directories.';
  }
  return null;
};

module.exports = backupDir;
