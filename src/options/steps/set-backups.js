const path = require('path');
const _ = require('../../utils');

const setBackups = opts => {

  if (!_.isValidArray(opts._files)) { 
    return; 
  }

  if (!_.isSet(opts.backupDir)) {
    return;
  }

  const backupDir = opts.backupDirDate
    ? path.join(opts.backupDir, _.getBlockDate().substr(0, 14))
    : opts.backupDir;

  const dirs = opts._files.map(file => (path.dirname(file.in)));
  const baseDir = _.getCommonPath(dirs);
  if (!_.isValidString(baseDir)) {
    return ['Cannot determine base directory for backup.'];
  }

  opts._files.forEach(file => {
    const relFilePath = file.in.substr(baseDir.length);
    file.save = path.join(backupDir, relFilePath);
  });

  return [];
};

module.exports = setBackups;
