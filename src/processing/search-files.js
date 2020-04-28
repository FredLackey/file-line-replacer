const fs = require('fs');
const readline = require('readline');
const _ = require('../utils');

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

const getBlocks = async (filePath, lines, caseSensitive, matchWhitespace) => {
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

const searchFiles = async (opts) => {

  const files = opts._files.filter(file => (_.isFile(file.in)));

  for (let i = 0; i < files.length; i += 1) {
    try {
      const info = await getBlocks(files[i].in, opts.oldLines, opts.caseSensitive, opts.matchWhitespace);
      if (!info || !info.blocks) { 
        files[i].error = 'Unexpected results while searching file.';
      } else {
        files[i].lines = info.lineCount;
        files[i].blocks = info.blocks;
      }
    } catch (ex) {
      files[i].error = 'Problem searching file.'
    }
  }

  const failures = opts._files.filter(file => (_.isValidString(file.error))).length;
  return (failures === 0) ? [] : [ 'Failure searching source files.' ];
};

module.exports = searchFiles;
