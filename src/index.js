const fs        = require('fs');
const os        = require('os');
const path      = require('path');
const readline  = require('readline');
const bootstrap = require('./bootstrap');
const _         = require('./utils');

const handleLine = (cache, curLine) => {
  cache.lineCount += 1;

  const matched = _.isMatch(cache.lines[0], curLine, cache.caseSensitive, cache.matchWhitespace);
  if (matched === true) {
    cache.blocks.push({
      start: cache.lineCount,
      lines: [curLine],
      pads : []
    });
  } else if (matched !== false) {
    throw new Error('mismatch');
  }

  // Process existing blocks
  cache.blocks
    .filter(block => (block 
      && cache.lines.length > block.lines.length
      && block.start < cache.lineCount 
      && block.invalid !== true))
    .forEach(block => {
      const nextLine = cache.lines[block.lines.length];

      if (_.isMatch(nextLine, curLine, cache.caseSensitive, cache.matchWhitespace)) {
        block.lines.push(curLine);
        block.pads.push(_.getPads(curLine));
      } else {
        block.invalid = true;
      }
    });

};

const finddBlocks = async (filePath, lines, caseSensitive, matchWhitespace) => {
  const stream  = fs.createReadStream(filePath);
  const file    = await readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  const cache = {
    lines,
    lineCount : 0,
    blocks    : [],
    curBlock  : null,
    caseSensitive,
    matchWhitespace
  };

  for await (const line of file) {
    handleLine(cache, line);
  }

  const result = {
    blocks    : cache.blocks.filter(block => (block && block.invalid !== true)).map(block => ({
      start: block.start,
      pads : block.pads
    })),
    lineCount : cache.lineCount
  }

  await stream.close();

  return result;
};

const replaceLines = async (sourceFile, destinationFile, blocks, oldLines, newLines, preserveWhitespace) => {

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
        await outStream.write(newLine + os.EOL);
        // console.log(newLine);
      }

    } else if (!impacted.includes(lineNumber)) {
      await outStream.write(line + os.EOL);
      // console.log(line);
    }

  }

  await outStream.end();
  await outStream.close();

  return { impacted }
};

module.exports = async (opts) => {

  const error = await bootstrap(opts);
  if (error) {
    const errObject = new Error(error.message);
    errObject.id = error.id;
    throw errObject;
  }

  const tempFilePath = _.isFile(opts.destinationFile)
    ? path.join(opts.tempDir, `${_.getBlockdate()}.flr`)
    : opts.destinationFile;

  const { blocks } = await finddBlocks(
    opts.sourceFile, 
    opts.oldLines, 
    (opts.caseSensitive === true), 
    (opts.matchWhitespace === true)
  );

  const { impacted } = await replaceLines(
    opts.sourceFile, 
    tempFilePath, 
    blocks, 
    opts.oldLines, 
    opts.newLines, 
    (opts.preserveWhitespace === true)
  );


  if (impacted.length === 0) {
    _.deleteFile(tempFilePath);
    return impacted;
  }
  if (tempFilePath === opts.destinationFile) {
    return impacted;
  }
  _.copyContents(tempFilePath, opts.destinationFile);
  _.deleteFile(tempFilePath);

  console.log(path.dirname(tempFilePath));
  console.log(tempFilePath);

  return impacted;
}