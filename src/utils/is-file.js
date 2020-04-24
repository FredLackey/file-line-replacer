const fs = require('fs');

const isFile = filePath => {
  try {
    return fs.lstatSync(filePath).isFile();
  } catch (e) {
    return false;
  }
};

module.exports = isFile;
