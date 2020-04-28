const findSourceFiles   = require('./find-source-files');
const loadArrays        = require('./load-arrays');
const preventOverwrite  = require('./prevent-overwrite');
const setBackups        = require('./set-backups');
const setDefaults       = require('./set-defaults');
const setDestinations   = require('./set-destinations');
const splitArrays       = require('./split-arrays');
const unknowns          = require('./unknowns');
const validate          = require('./validate');
const verifyFormats     = require('./verify-formats');

module.exports = {
  findSourceFiles,
  loadArrays,
  preventOverwrite,
  setBackups,
  setDefaults,
  setDestinations,
  splitArrays,
  unknowns,
  validate,
  verifyFormats
};
