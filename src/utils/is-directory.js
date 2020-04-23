const fs = require('fs');

const isDirectory = dirPath => {
  try {
    return fs.lstatSync(dirPath).isDirectory();
  } catch (e) {
    return false;
  }
};

module.exports = isDirectory;
