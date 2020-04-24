const path = require('path');
const test = require('../src');
const _     = require('../src/utils');

const OLD_FILE = path.resolve(path.join(__dirname), '../samples/sample-model.js');
const OLD_LINES = [
  '      type: DataTypes.INTEGER.UNSIGNED,',
  '      allowNull: false,',
  '      primaryKey: true'
];

_.makePath(path.join(__dirname, '../.env.test'));

const opts = { 
  sourceFile          : OLD_FILE,
  destinationFile     : path.resolve(path.join(__dirname, '../.env.test/sample-model.js')),
  backupDir           : path.resolve(path.join(__dirname, '../.env.test/backups')),
  // oldLineFile, 
  newLineFile         : path.resolve(path.join(__dirname, '../samples/sample-new-lines.txt')),
  oldLines            : OLD_LINES, 
  // newLines, 
  caseSensitive       : true, 
  matchWhitespace     : true, 
  preserveWhitespace  : true, 
  overwrite           : true,
  // emptyLines,
  emptyLinesNew       : true,
  // emptyLinesOld
};

const main = async () => {
  const result = await test(opts);
  console.log(JSON.stringify(result));
};

main();
