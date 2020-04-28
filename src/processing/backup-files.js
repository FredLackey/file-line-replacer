const path = require('path');
const _ = require('../utils');

const backupFile = async (file) => {
  if (!_.makePath(path.dirname(file.save))) {
    return 'Backup directory not created.';
  }
  try {
    _.copyContents(file.in, file.save);
  } catch (ex) {
    return 'File not backed up.';
  }
  return null;
};

const backupFiles = async (opts) => {

  const files = opts._files
    .filter(file => (_.isValidString(file.save) && _.isValidArray(file.blocks)));
  
  for (let i = 0; i < files.length; i += 1) {
    const error = await backupFile(files[i]);
    if (_.isValidString(error)) {
      files[i].error = error;
    }
  }

  return (files.filter(file => (_.isValidString(file.error))).length === 0)
    ? []
    : ['Failure during backup process.'];
};

module.exports = backupFiles;
