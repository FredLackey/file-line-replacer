const fs = require('fs');
const readline = require('readline');

const readLines = async (filePath) => {
  const lines = [];
  try {
    const stream  = fs.createReadStream(filePath);
    const file    = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });
    for await (const line of file) {
      lines.push(line);
    }
    return lines;
  } catch (ex) {
    return undefined;
  }
};

module.exports = readLines;