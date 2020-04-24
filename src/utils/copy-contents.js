const fs = require('fs');
const os = require('os');
const readline = require('readline');

const copyContents = async (sourceFile, destinationFile) => {
  const inStream  = fs.createReadStream(sourceFile);
  const inFile    = await readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  const outStream = fs.createWriteStream(destinationFile);

  for await (const line of inFile) {
    await outStream.write(line + os.EOL);
  }

  await outStream.end();
  await outStream.close();
}

module.exports = copyContents;