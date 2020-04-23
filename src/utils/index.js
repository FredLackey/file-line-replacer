const getBlockdate  = require('./get-blockdate');
const getPads       = require('./get-pads');
const isBoolean     = require('./is-boolean');
const isDirectory   = require('./is-directory');
const isFile        = require('./is-file');
const isMatch       = require('./is-match');
const isSet         = require('./is-set');
const isValidArray  = require('./is-valid-array');
const isValidString = require('./is-valid-string');
const makePath      = require('./make-path');
const readLines     = require('./read-lines');
const trimArray     = require('./trim-array').trim;

module.exports = {
  getBlockdate,
  getPads,
  isBoolean,
  isDirectory,
  isFile,
  isMatch,
  isSet,
  isValidArray,
  isValidString,
  makePath,
  readLines,
  trimArray
};
