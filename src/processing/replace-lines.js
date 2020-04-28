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

const replaceLines = async (opts) => {

  const files = opts._files.filter(file => (_.isSet(file.out) && _.isValidArray(file.blocks)));

  for (let i = 0; i < files.length; i += 1) {

    const { in: sourceFile, out: destinationFile, blocks } = files[i];
    const { oldLines, newLines, preserveWhitespace } = opts;
  
    try {
      const { impacted } = await processFile(sourceFile, destinationFile, blocks, oldLines, newLines, preserveWhitespace);
      if (!_.isValidArray(impacted)) {
        files[i].error = 'Unexpected result replacing lines.';
      } else {
        files[i].success = true;
      }
    } catch (ex) {
      files[i].error = 'Problem replacing lines.';
    }

  }

  return (files.filter(file => (_.isValidString(file.error))).length === 0)
    ? []
    : [ 'Failure replacing lines.' ];
};

module.exports = replaceLines;
