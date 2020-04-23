const fs = require('fs');
const isDir = require('./is-directory');

const makePath = dirPath => {
  if (isDir(dirPath)) { return true; }
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    return isDir(dirPath);
  } catch (e) {
    return false;
  }
};

module.exports = makePath;
