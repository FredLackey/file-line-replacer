const fs = require('fs');
const isFile = require('./is-file');

const deleteFile = (filePath, missingOkay = true) => {
  if (!isFile(filePath)) { return (missingOkay === true); }
  try {
    fs.unlinkSync(filePath);
    return (!isFile(filePath));
  } catch (ex) {
    return (!isFile(filePath));
  }
};

module.exports = deleteFile;
