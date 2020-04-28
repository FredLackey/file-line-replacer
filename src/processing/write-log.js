const fs      = require('fs');
const path    = require('path');
const { EOL } = require('os');
const _       = require('../utils');

const whiteLog = async (opts) => {

  const files = opts._files.filter(file => (file && _.isValidString(file.out)));
  const good  = files.filter(file => (file && file.success === true));
  const bad   = files.filter(file => (file && !good.includes(file)));

  const lines = [];

  bad.forEach(file => {
    lines.push(`ERROR : ${file.in}`);
  });
  good.forEach(file => {
    lines.push(`SUCCESS : ${file.in}`);
    if (file.in !== file.out) {
      lines.push(`NEW : ${file.out}`);
    }
  });

  opts._log = path.join(opts.tempDir, `${_.getBlockDate()}.flr`);
  const logStream = fs.createWriteStream(opts._log);

  const errors = [];

  try {
    for (let i = 0; i < lines.length; i += 1) {
      await logStream.write(lines[i] + EOL);
    }
  } catch (ex) {
    errors.push('Problem writing to log file.');
  }

  try {
    await logStream.end();
  } catch (ex) {
    errors.push('Problem ending log file.');
  }

  try {
    await logStream.close();
  } catch (ex) {
    errors.push('Problem closing log file.');
  }

  return errors;
};

module.exports = whiteLog;
