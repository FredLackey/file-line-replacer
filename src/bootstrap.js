const os    = require('os');
const path  = require('path');
const _ = require('./utils');

module.exports = async (opts) => {

  if (_.isSet(opts.makeDirs) && !_.isBoolean(opts.makeDirs)) { return { id: 1, message: 'Make directory flag is not a valid format.' }; }
  opts.makeDirs = _.isBoolean(opts.makeDirs) ? opts.makeDirs : true;

  if (!_.isSet(opts.sourceFile)) { return { id: 10, message: 'Source file must be supplied.' }; }
  if (!_.isValidString(opts.sourceFile)) { return { id: 11, message: 'Source file is not a valid path.' }; }
  if (!_.isFile(opts.sourceFile)) { return { id: 12, message: 'Source file does not exist.' }; }

  if (_.isSet(opts.destinationFile)) {
    if (!_.isValidString(opts.destinationFile)) { return { id: 20, message: 'Destination file not a valid path format.' }; }
    if (opts.sourceFile !== opts.destinationFile) {
      if (_.isFile(opts.destinationFile) && !opts.overwrite) { return { id: 21, message: 'Destination file already exists.' }; }
      if (!_.isDirectory(path.dirname(opts.destinationFile)) && !opts.makeDirs) { return { id: 22, message: 'Destination folder does not exist.' }; }
    }
  } else {
    opts.destinationFile = opts.sourceFile;
  }

  if (_.isSet(opts.oldLineFile)) {
    if (!_.isValidString(opts.oldLineFile)) { return { id: 30, message: 'Old lines file not a valid path format.' }; }
    if (!_.isFile(opts.oldLineFile)) { return { id: 31, message: 'Old lines file not a valid path.' }; }
    if (_.isSet(opts.oldLines)) { return { id: 32, message: 'Old lines file cannot be supplied with old lines.' }; }
  } else {
    if (!_.isSet(opts.oldLines)) { return { id: 33, message: 'Old lines or an old lines file must be supplied.' }; }
  }

  if (_.isSet(opts.newLineFile)) {
    if (!_.isValidString(opts.newLineFile)) { return { id: 40, message: 'New lines file not a valid path format.' }; }
    if (!_.isFile(opts.newLineFile)) { return { id: 41, message: 'New lines file not a valid path.' }; }
    if (_.isSet(opts.newLines)) { return { id: 42, message: 'New lines file cannot be supplied with new lines.' }; }
  } else {
    if (!_.isSet(opts.newLines)) { return { id: 43, message: 'New lines or a new lines file must be supplied.' }; }
  }

  if (_.isSet(opts.oldLines)) {
    if (!_.isValidArray(opts.oldLines)) { return { id: 50, message: 'Old lines are not a valid format.' }; }
    if (opts.oldLines.filter(x => (_.isSet(x) && !_.isValidString(x, true))).length > 0) { return { id: 51, message: 'Old lines contains invalid values.' }; }
  }

  if (_.isSet(opts.newLines)) {
    if (!_.isValidArray(opts.newLines, true)) { return { id: 60, message: 'New lines are not a valid format.' }; }
    if (opts.newLines.filter(x => (_.isSet(x) && !_.isValidString(x, true))).length > 0) { return { id: 61, message: 'New lines contains invalid values.' }; }
  }

  if (_.isSet(opts.caseSensitive) && !_.isBoolean(opts.caseSensitive)) { return { id: 70, message: 'Case sensitive flag is not a valid format.' }; }

  if (_.isSet(opts.matchWhitespace) && !_.isBoolean(opts.matchWhitespace)) { return { id: 80, message: 'Match whitespace flag is not a valid format.' }; }

  if (_.isSet(opts.preserveWhitespace) && !_.isBoolean(opts.preserveWhitespace)) { return { id: 90, message: 'Preserve whitespace flag is not a valid format.' }; }

  if (_.isSet(opts.emptyLines)) {
    if (!_.isBoolean(opts.emptyLines)) { return { id: 100, message: 'Empty lines flag is not a valid format.' }; }
    if (_.isSet(opts.emptyLinesNew) && opts.emptyLinesNew !== opts.emptyLines) { return { id: 101, message: 'Empty flag changes the meaning of the empty lines NEW flag.' }; }
    if (_.isSet(opts.emptyLinesOld) && opts.emptyLinesOld !== opts.emptyLines) { return { id: 102, message: 'Empty flag changes the meaning of the empty lines OLD flag.' }; }
  }

  if (_.isSet(opts.emptyLinesNew)) {
    if (!_.isBoolean(opts.emptyLinesNew)) { return { id: 110, message: 'Empty lines NEW flag is not a valid format.' }; }
    if (_.isSet(opts.emptyLines) && opts.emptyLinesNew !== opts.emptyLines) { return { id: 111, message: 'Empty flag changes the meaning of the empty lines NEW flag.' }; }
  }
  if (_.isSet(opts.emptyLinesOld)) {
    if (!_.isBoolean(opts.emptyLinesOld)) { return { id: 120, message: 'Empty lines OLD flag is not a valid format.' }; }
    if (_.isSet(opts.emptyLines) && opts.emptyLinesOld !== opts.emptyLines) { return { id: 121, message: 'Empty flag changes the meaning of the empty lines OLD flag.' }; }
  }

  if (_.isSet(opts.newLineFile)) {
    opts.newLines = await _.readLines(opts.newLineFile);
    if (!_.isSet(opts.newLines)) { return { id: 130, message: 'New lines source file could not be read.' }; }
    if (!_.isValidArray(opts.newLines, true)) { return { id: 131, message: 'New lines source file is empty.' }; }
    if (opts.emptyLinesNew !== true && opts.emptyLines !== true) {
      opts.newLines = _.trimArray(opts.newLines);
    }
    if (!_.isValidArray(opts.newLines, true)) { return { id: 132, message: 'New lines source file contains only empty lines.' }; }
  }
  
  if (_.isSet(opts.oldLineFile)) {
    opts.oldLines = await _.readLines(opts.oldLineFile);
    if (!_.isSet(opts.oldLines)) { return { id: 140, message: 'Old lines source file could not be read.' }; }
    if (!_.isValidArray(opts.oldLines, true)) { return { id: 141, message: 'Old lines source file is empty.' }; }
    if (opts.emptyLinesOld !== true && opts.emptyLines !== true) {
      opts.oldLines = _.trimArray(opts.oldLines);
    }
    if (!_.isValidArray(opts.oldLines, true)) { return { id: 142, message: 'Old lines source file contains only empty lines.' }; }
  }

  if (_.isSet(opts.tempDir)) {
    if (!_.isValidString(opts.tempDir)) { return { id: 150, message: 'Temp folder not a valid path format.' }; }
    if (!_.isDirectory(opts.tempDir) && !opts.makeDirs) { return { id: 151, message: 'Temp folder does not exist.' }; }
  } else {
    opts.tempDir = os.tmpdir();
  }

  if (_.isSet(opts.backupDir) && _.isFile(opts.destinationFile)) {
    if (!_.isValidString(opts.backupDir)) { return { id: 170, message: 'Backup folder not a valid path format.' }; }
    if (!_.isDirectory(opts.backupDir) && !opts.makeDirs) { return { id: 171, message: 'Backup folder does not exist.' }; }
  }  

  if (!_.isDirectory(path.dirname(opts.destinationFile)) && !_.makePath(path.dirname(opts.destinationFile))) { return { id: 160, message: 'Destination folder could not be created.' }; }
  if (!_.isDirectory(opts.tempDir) && !_.makePath(opts.tempDir)) { return { id: 161, message: 'Temp folder does could not be created.' }; }
  if (_.isSet(opts.backupDir) && _.isFile(opts.destinationFile)) {
    if (!_.isDirectory(opts.backupDir) && !_.makePath(opts.backupDir)) { return { id: 162, message: 'Backup folder does could not be created.' }; }
    opts.backupDirFull = path.join(opts.backupDir, _.getBlockdate().substr(0, 14))
    if (!_.makePath(opts.backupDirFull)) { return { id: 163, message: 'Backup folder length is too long.' }; }
    if (_.isFile(path.join(opts.backupDirFull, path.basename(opts.destinationFile)))) { return { id: 164, message: 'Backup file cannot be overwritten.' }; }
  }

  return undefined;
};
