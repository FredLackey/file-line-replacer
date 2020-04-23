const path = require('path');
const _ = require('./utils');

module.exports = async (opts) => {

  const { 
    sourceFile, destinationFile, 
    oldLineFile, newLineFile,
    oldLines, newLines, 
    emptyLines, emptyLinesNew, emptyLinesOld,
    caseSensitive, matchWhitespace, preserveWhitespace, overwrite } = opts;

  if (!_.isSet(sourceFile)) { return { id: 10, message: 'Source file must be supplied.' }; }
  if (!_.isValidString(sourceFile)) { return { id: 11, message: 'Source file is not a valid path.' }; }
  if (!_.isFile(sourceFile)) { return { id: 12, message: 'Source file does not exist.' }; }

  if (_.isSet(destinationFile)) {
    if (!_.isValidString(destinationFile)) { return { id: 20, message: 'Destination file not a valid path format.' }; }
    if (sourceFile !== destinationFile) {
      if (_.isFile(destinationFile) && !overwrite) { return { id: 21, message: 'Destination file already exists.' }; }
      if (!_.isDirectory(path.dirname(destinationFile))) { return { id: 22, message: 'Destination folder does not exist.' }; }
    }
  }

  if (_.isSet(oldLineFile)) {
    if (!_.isValidString(oldLineFile)) { return { id: 30, message: 'Old lines file not a valid path format.' }; }
    if (!_.isFile(oldLineFile)) { return { id: 31, message: 'Old lines file not a valid path.' }; }
    if (_.isSet(oldLines)) { return { id: 32, message: 'Old lines file cannot be supplied with old lines.' }; }
  } else {
    if (!_.isSet(oldLines)) { return { id: 33, message: 'Old lines or an old lines file must be supplied.' }; }
  }

  if (_.isSet(newLineFile)) {
    if (!_.isValidString(newLineFile)) { return { id: 40, message: 'New lines file not a valid path format.' }; }
    if (!_.isFile(newLineFile)) { return { id: 41, message: 'New lines file not a valid path.' }; }
    if (_.isSet(newLines)) { return { id: 42, message: 'New lines file cannot be supplied with new lines.' }; }
  } else {
    if (!_.isSet(newLines)) { return { id: 43, message: 'New lines or a new lines file must be supplied.' }; }
  }

  if (_.isSet(oldLines)) {
    if (!_.isValidArray(oldLines)) { return { id: 50, message: 'Old lines are not a valid format.' }; }
    if (oldLines.filter(x => (_.isSet(x) && !_.isValidString(x, true))).length > 0) { return { id: 51, message: 'Old lines contains invalid values.' }; }
  }

  if (_.isSet(newLines)) {
    if (!_.isValidArray(newLines, true)) { return { id: 60, message: 'New lines are not a valid format.' }; }
    if (newLines.filter(x => (_.isSet(x) && !_.isValidString(x, true))).length > 0) { return { id: 61, message: 'New lines contains invalid values.' }; }
  }

  if (_.isSet(caseSensitive) && !_.isBoolean(caseSensitive)) { return { id: 70, message: 'Case sensitive flag is not a valid format.' }; }

  if (_.isSet(matchWhitespace) && !_.isBoolean(matchWhitespace)) { return { id: 80, message: 'Match whitespace flag is not a valid format.' }; }

  if (_.isSet(preserveWhitespace) && !_.isBoolean(preserveWhitespace)) { return { id: 90, message: 'Preserve whitespace flag is not a valid format.' }; }

  if (_.isSet(emptyLines)) {
    if (!_.isBoolean(emptyLines)) { return { id: 100, message: 'Empty lines flag is not a valid format.' }; }
    if (_.isSet(emptyLinesNew) && emptyLinesNew !== emptyLines) { return { id: 101, message: 'Empty flag changes the meaning of the empty lines NEW flag.' }; }
    if (_.isSet(emptyLinesOld) && emptyLinesOld !== emptyLines) { return { id: 102, message: 'Empty flag changes the meaning of the empty lines OLD flag.' }; }
  }

  if (_.isSet(emptyLinesNew)) {
    if (!_.isBoolean(emptyLinesNew)) { return { id: 110, message: 'Empty lines NEW flag is not a valid format.' }; }
    if (_.isSet(emptyLines) && emptyLinesNew !== emptyLines) { return { id: 111, message: 'Empty flag changes the meaning of the empty lines NEW flag.' }; }
  }
  if (_.isSet(emptyLinesOld)) {
    if (!_.isBoolean(emptyLinesOld)) { return { id: 120, message: 'Empty lines OLD flag is not a valid format.' }; }
    if (_.isSet(emptyLines) && emptyLinesOld !== emptyLines) { return { id: 121, message: 'Empty flag changes the meaning of the empty lines OLD flag.' }; }
  }

  let _newLines = null;
  if (_.isSet(newLineFile)) {
    _newLines = await _.readLines(newLineFile);
    if (!_.isSet(_newLines)) { return { id: 130, message: 'New lines source file could not be read.' }; }
    if (!_.isValidArray(_newLines, true)) { return { id: 131, message: 'New lines source file is empty.' }; }
    if (emptyLinesNew !== true && emptyLines !== true) {
      _newLines = _.trimArray(_newLines);
    }
    if (!_.isValidArray(_newLines, true)) { return { id: 132, message: 'New lines source file contains only empty lines.' }; }
    opts.newLines = _newLines;
  }
  
  let _oldLines = null;
  if (_.isSet(oldLineFile)) {
    _oldLines = await _.readLines(oldLineFile);
    if (!_.isSet(_oldLines)) { return { id: 140, message: 'Old lines source file could not be read.' }; }
    if (!_.isValidArray(_oldLines, true)) { return { id: 141, message: 'Old lines source file is empty.' }; }
    if (emptyLinesOld !== true && emptyLines !== true) {
      _oldLines = _.trimArray(_oldLines);
    }
    if (!_.isValidArray(_oldLines, true)) { return { id: 142, message: 'Old lines source file contains only empty lines.' }; }
    opts.oldLines = _oldLines;
  }

  return undefined;
};
