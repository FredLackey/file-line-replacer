const copyContents    = require('./copy-contents');
const deleteFile      = require('./delete-file');
const getBlockDate    = require('./get-blockdate');
const getCommonPath   = require('./get-common-path');
const getPads         = require('./get-pads');
const getSubstring    = require('./get-substring');
const isAlpha         = require('./is-alpha');
const isAlphanumeric  = require('./is-alphanumeric');
const isBoolean       = require('./is-boolean');
const isDigits        = require('./is-digits');
const isDirectory     = require('./is-directory');
const isFile          = require('./is-file');
const isMatch         = require('./is-match');
const isSet           = require('./is-set');
const isValidArray    = require('./is-valid-array');
const isValidGlob     = require('./is-valid-glob');
const isValidPath     = require('./is-valid-path');
const isValidString   = require('./is-valid-string');
const makePath        = require('./make-path');
const moveFile        = require('./move-file');
const print           = require('./print');
const readLines       = require('./read-lines');
const toKebabCase     = require('./to-kebab-case');
const toTable         = require('./to-table');
const trimArray       = require('./trim-array').trim;
const unique          = require('./unique');

module.exports = {
  copyContents,
  deleteFile,
  getBlockDate,
  getCommonPath,
  getPads,
  getSubstring,
  isAlpha,
  isAlphanumeric,
  ...isBoolean,
  isDigits,
  isDirectory,
  isFile,
  ...isValidGlob,
  isMatch,
  isSet,
  ...isValidArray,
  ...isValidPath,
  ...isValidString,
  makePath,
  moveFile,
  print,
  readLines,
  toKebabCase,
  toTable,
  trimArray,
  unique
};
