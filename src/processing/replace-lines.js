const fs        = require('fs');
const { EOL }   = require('os');
const readline  = require('readline');
const _         = require('../utils');

const processFile = async (sourceFile, destinationFile, blocks, oldLines, newLines, preserveWhitespace) => {

  const inStream  = fs.createReadStream(sourceFile);
  const inFile    = await readline.createInterface({
    input: inStream,
    crlfDelay: Infinity
  });
  const outStream = fs.createWriteStream(destinationFile);

  const impacted = [];
  blocks.forEach(block => {
    for (let i = 0; i < oldLines.length; i += 1) {
      if (impacted.includes((block.start + i))) { continue; }
      impacted.push((block.start + i));
    }
  });

  let lineNumber = 0;
  for await (const line of inFile) {
    lineNumber += 1;
    const block = blocks.find(x => (x && x.start === lineNumber));
    if (block) {

      for (let i = 0; i < newLines.length; i += 1) {
        const padPos  = (i < (block.pads.length - 1)) ? i : (block.pads.length - 1);
        const pad     = block.pads[padPos];
        const prefix  = pad.prefix === 0 ? '' : ''.padStart(pad.prefix, ' ');
        const suffix  = pad.suffix === 0 ? '' : ''.padStart(pad.suffix, ' ');
        const newLine = preserveWhitespace ? (prefix + newLines[i].trim() + suffix) : newLines[i];
        await outStream.write(newLine + EOL);
      }

    } else if (!impacted.includes(lineNumber)) {
      await outStream.write(line + EOL);
    }

  }

  await outStream.end();
  await outStream.close();

  return { impacted }
};

const copyTempContents = async (tempFile, destFile) => {
  try {
    await _.copyContents(tempFile, destFile);
    return true;
  } catch (ex) {
    return false;
  }
}

const replaceLines = async (opts) => {

  const files = opts._files.filter(file => (_.isSet(file.out) && _.isValidArray(file.blocks)));

  for (let i = 0; i < files.length; i += 1) {

    const { in: sourceFile, out: destinationFile, temp: tempFile, blocks } = files[i];
    const { oldLines, newLines, preserveWhitespace } = opts;

    // console.log(tempFile);
    // console.log(destinationFile);

    try {
      const { impacted } = await processFile(sourceFile, tempFile, blocks, oldLines, newLines, preserveWhitespace);
      if (!_.isValidArray(impacted)) {
        files[i].error = 'Unexpected result replacing lines.';
        continue;
      }
    } catch (ex) {
      files[i].error = 'Problem replacing lines.';
      continue;
    }

    const copied = await copyTempContents(tempFile, destinationFile);
    if (!copied) {
      files[i].error = 'Problem copying temp file to destination.';
      continue;
    }

    files[i].success = true;
    _.deleteFile(tempFile);
  }

  return (files.filter(file => (_.isValidString(file.error))).length === 0)
    ? []
    : [ 'Failure replacing lines.' ];
};

module.exports = replaceLines;
