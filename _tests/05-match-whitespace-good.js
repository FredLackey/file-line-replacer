const path = require('path');
const test = require('../src');
const _     = require('file-line-replacer-common').utils;

const OLD_FILE = path.resolve(path.join(__dirname), '../samples/sample-model.js');
const NEW_DIR  = path.resolve(path.join(path.dirname(OLD_FILE), '../.env.test/'));
const NEW_FILE = path.join(NEW_DIR, `${_.getBlockdate()}-${path.basename(OLD_FILE)}`);

const OLD_LINES = [
  '      type: DataTypes.INTEGER.UNSIGNED,',
  '      allowNull: false,',
  '      primaryKey: true'
];
const NEW_LINES = [
  'type: DataTypes.INTEGER.UNSIGNED,',
  'type: DataTypes.INTEGER.UNSIGNED,',
  'allowNull: false,',
  'allowNull: false,',
  'autoIncrement: false,',
  'autoIncrement: false,',
  'primaryKey: true',
  'primaryKey: true'
];

const opts = { 
  sourceFile          : OLD_FILE,
  destinationFile     : NEW_FILE,
  // oldLineFile, 
  // newLineFile,
  oldLines            : OLD_LINES, 
  newLines            : NEW_LINES, 
  // caseSensitive, 
  matchWhitespace     : true, 
  preserveWhitespace  : true, 
  // overwrite 
};

const main = async () => {
  _.makePath(NEW_DIR);
  const result = await test(opts);
  console.log(JSON.stringify(result, null, 2));
};

main();
