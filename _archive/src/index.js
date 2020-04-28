const fs          = require('fs');
const os          = require('os');
const readline    = require('readline');
const _           = require('./utils');
const options     = require('./options');
const processing  = require('./processing');

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
      }

    } else if (!impacted.includes(lineNumber)) {
      await outStream.write(line + os.EOL);
    }

  }

  await outStream.end();
  await outStream.close();

  return { impacted }
};



module.exports.replace = async (opts) => {

  _.print(opts);

  let errors = [];

  errors = _.isValidArray(errors) ? errors : options.steps.unknowns(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDefaults(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.splitArrays(opts);
  _.print(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.verifyFormats(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.loadArrays(opts);
  _.print(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.validate(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.findSourceFiles(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDestinations(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setBackups(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.preventOverwrite(opts);

  errors = _.isValidArray(errors) ? errors : processing.backupFiles(opts);

  errors = _.unique(errors);

  return { 
    errors,
    files : opts._files,
    base  : opts._common
  };

}

// const replaceOne = async (opts) => {

//   const error = await bootstrap(opts);
//   if (error) {
//     const errObject = new Error(error.message);
//     errObject.id = error.id;
//     throw errObject;
//   }

//   const isOverwrite = _.isFile(opts.destinationFile);

//   const tempFilePath = isOverwrite
//     ? path.join(opts.tempDir, `${_.getBlockDate()}.flr`)
//     : opts.destinationFile;

//   const { blocks } = await findBlocks(
//     opts.sourceFile, 
//     opts.oldLines, 
//     (opts.caseSensitive === true), 
//     (opts.matchWhitespace === true)
//   );

//   if (_.isSet(opts.backupDirFull) && isOverwrite) {
//     const backupFile = path.join(opts.backupDirFull, path.basename(opts.destinationFile));
//     await _.copyContents(opts.sourceFile, backupFile);
//     if (!_.isFile(backupFile)) {
//       throw new Error('Original file could not be backed up.');
//     }
//   }

//   const { impacted } = await replaceLines(
//     opts.sourceFile, 
//     tempFilePath, 
//     blocks, 
//     opts.oldLines, 
//     opts.newLines, 
//     (opts.preserveWhitespace === true)
//   );


//   if (impacted.length === 0) {
//     _.deleteFile(tempFilePath);
//     return impacted;
//   }
//   if (tempFilePath === opts.destinationFile) {
//     return impacted;
//   }
//   _.copyContents(tempFilePath, opts.destinationFile);
//   _.deleteFile(tempFilePath);

//   return { 
//     impacted, 
//     tempFilePath,
//     isOverwrite,
//     options : JSON.parse(JSON.stringify(opts))
//   };
// }
// const replaceMany = async (opts) => {

//   const error = await bootstrap(opts);
//   if (error) {
//     const errObject = new Error(error.message);
//     errObject.id = error.id;
//     throw errObject;
//   }

//   const globOptions = {
//     cwd       : opts.searchDir,
//     pattern   : opts.searchPattern,
//     ignore    : opts.ignorePattern,
//     nodir     : true,
//     silent    : true
//   }
//   const globFiles = glob.sync(pattern, globOptions)
//   const paths = globFiles.map(filePath => {
//     return path.join(opts.searchDir, filePath);
//   });


//   // const isOverwrite = _.isFile(opts.destinationFile);

//   // const tempFilePath = isOverwrite
//   //   ? path.join(opts.tempDir, `${_.getBlockDate()}.flr`)
//   //   : opts.destinationFile;

//   // const { blocks } = await findBlocks(
//   //   opts.sourceFile, 
//   //   opts.oldLines, 
//   //   (opts.caseSensitive === true), 
//   //   (opts.matchWhitespace === true)
//   // );

//   // if (_.isSet(opts.backupDirFull) && isOverwrite) {
//   //   const backupFile = path.join(opts.backupDirFull, path.basename(opts.destinationFile));
//   //   await _.copyContents(opts.sourceFile, backupFile);
//   //   if (!_.isFile(backupFile)) {
//   //     throw new Error('Original file could not be backed up.');
//   //   }
//   // }

//   // const { impacted } = await replaceLines(
//   //   opts.sourceFile, 
//   //   tempFilePath, 
//   //   blocks, 
//   //   opts.oldLines, 
//   //   opts.newLines, 
//   //   (opts.preserveWhitespace === true)
//   // );


//   // if (impacted.length === 0) {
//   //   _.deleteFile(tempFilePath);
//   //   return impacted;
//   // }
//   // if (tempFilePath === opts.destinationFile) {
//   //   return impacted;
//   // }
//   // _.copyContents(tempFilePath, opts.destinationFile);
//   // _.deleteFile(tempFilePath);

//   // return { 
//   //   impacted, 
//   //   tempFilePath,
//   //   isOverwrite,
//   //   options : JSON.parse(JSON.stringify(opts))
//   // };

// }
// const replace = async (opts) => {
//   let results = null;
//   if (_.isValidString(opts.sourceFile)) {
//     results = await replaceOne(opts);
//   } else {
//     results = await replaceMany(opts);
//   }
//   return results;
// }
