const glob = require('glob');
const _ = require('../../utils');

const findSourceFiles = opts => {

  let files = [];

  if (_.isValidString(opts.sourceFile)) {
    files.push(opts.sourceFile); 
  }

  if (_.isValidString(opts.searchDir)) {
    const pattern = _.isValidString(opts.searchPatterns) ? opts.searchPatterns : '**/*.*';
    const options = {
      cwd       : opts.searchDir,
      silent    : true,
      nodir     : true,
      absolute  : true
    };

    options.ignore = _.isValidArray(opts.ignorePatterns)
      ? opts.ignorePatterns.length === 1
        ? opts.ignorePatterns[0]
        : opts.ignorePatterns
      : options.ignore;

    try {
      files = glob.sync(pattern, options);
    } catch (ex) {
      return ['Error while searching for files.'];
    }
  }

  opts._files = files.map(file => ({
    in: file
  }));

  return [];
};

module.exports = findSourceFiles;
