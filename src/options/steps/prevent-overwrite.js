const _ = require('../../utils');

const preventOverwrite = opts => {

  if (!_.isValidArray(opts._files)) { 
    return; 
  }

  const errors = [];

  const save = opts._files
    .filter(file => (opts.overwrite !== true && _.isFile(file.out)));
  const safeBackup = opts._files
    .filter(file => (_.isFile(file.save)));

  if (save.length === 1) {
    errors.push('Destination file exists while overwrite is not enabled.');
  }
  if (save.length > 1) {
    errors.push('Destination files exist while overwrite is not enabled.');
  }
  if (safeBackup > 0) {
    errors.push('Backup files already exist and overwrite is not allowed.');
  }

  return errors;
};

module.exports = preventOverwrite;
