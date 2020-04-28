const _           = require('./utils');
const options     = require('./options');
const processing  = require('./processing');

module.exports.replace = async (opts) => {

  let errors = [];

  errors = _.isValidArray(errors) ? errors : options.steps.unknowns(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDefaults(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.splitArrays(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.verifyFormats(opts);
  errors = _.isValidArray(errors) ? errors : await options.steps.loadArrays(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.validate(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.findSourceFiles(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setDestinations(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.setBackups(opts);
  errors = _.isValidArray(errors) ? errors : options.steps.preventOverwrite(opts);

  errors = _.isValidArray(errors) ? errors : await processing.searchFiles(opts);
  errors = _.isValidArray(errors) ? errors : await processing.makeDirs(opts);
  errors = _.isValidArray(errors) ? errors : await processing.backupFiles(opts);
  errors = _.isValidArray(errors) ? errors : await processing.replaceLines(opts);
  errors = _.isValidArray(errors) ? errors : await processing.writeLog(opts);

  errors = _.unique(errors);

  return {
    errors,
    files : opts._files
  };
};
