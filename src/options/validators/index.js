const backupDir = require('./backup-dir');
const destinationDir = require('./destination-dir');
const destinationFile = require('./destination-file');
const ignorePatterns = require('./ignore-patterns');
const ignorePatternsFile = require('./ignore-patterns-file');
const newLinesFile = require('./new-lines-file');
const oldLinesFile = require('./old-lines-file');
const searchDir = require('./search-dir');
const searchPatterns = require('./search-patterns');
const searchPatternsFile = require('./search-patterns-file');
const sourceFile = require('./source-file');
const tempDir = require('./temp-dir');

module.exports = {
  backupDir,
  destinationDir,
  destinationFile,
  ignorePatterns,
  ignorePatternsFile,
  newLinesFile,
  oldLinesFile,
  searchDir,
  searchPatterns,
  searchPatternsFile,
  sourceFile,
  tempDir
};
