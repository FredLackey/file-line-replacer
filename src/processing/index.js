const backupFiles   = require('./backup-files');
const makeDirs      = require('./make-dirs');
const replaceLines  = require('./replace-lines');
const searchFiles   = require('./search-files');
const writeLog      = require('./write-log');

module.exports = {
  backupFiles,
  makeDirs,
  replaceLines,
  searchFiles,
  writeLog
};
