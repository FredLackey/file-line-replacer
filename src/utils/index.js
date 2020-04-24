const copyContents    = require('./copy-contents');
const deleteFile      = require('./delete-file');
const getBlockdate    = require('./get-blockdate');
const getPads         = require('./get-pads');
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
const isValidString   = require('./is-valid-string');
const makePath        = require('./make-path');
const moveFile        = require('./move-file');
const readLines       = require('./read-lines');
const trimArray       = require('./trim-array').trim;

module.exports = {
  copyContents,
  deleteFile,
  getBlockdate,
  getPads,
  isAlpha,
  isAlphanumeric,
  isBoolean,
  isDigits,
  isDirectory,
  isFile,
  isValidGlob,
  isMatch,
  isSet,
  isValidArray,
  isValidString,
  makePath,
  moveFile,
  readLines,
  trimArray
};
