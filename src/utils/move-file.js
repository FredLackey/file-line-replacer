const fs = require('fs');
const path = require('path');
const isFile = require('./is-file');
const deleteFile = require('./delete-file');
const makePath = require('./make-path');

const moveFile = (sourcePath, destinationPath) => {
  if (!deleteFile(destinationPath, true)) { return false; }
  if (!makePath(path.dirname(destinationPath))) { return false; }
  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (ex) {
    if (!isFile(destinationPath)) { return false; }
  }
  if (!isFile(destinationPath)) { return false; }
  return deleteFile(sourcePath);
};

module.exports = moveFile;
