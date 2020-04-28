#!/usr/bin/env node

const _ = require('./utils');
const { replace } = require('./index');

const { argv } = require('yargs')
  .group([
    'search-dir',
    'search-pattern',
    'ignore-pattern',
    'ignore-patterns-file',
    'destination-dir'
  ], 'Just for Multiple Files:')
  .group([
    'source-file',
    'destination-file',
  ], 'Just for Single Files:')
  .group([
    'old-lines',
    'old-lines-file',
    'new-lines',
    'new-lines-file',
    'delimiter',
    'empty-lines',
    'empty-lines-new',
    'empty-lines-old',
  ], 'Specifying Changes:')
  .group([
    'case-sensitive',
    'match-whitespace',
    'preserve-whitespace',
    'overwrite',
  ], 'File Handling:')
  .group([
    'temp-dir',
    'backup-dir',
    'backup-dir-date',
    'make-dirs',
  ], 'Directory-Related Stuff:')

  .options({
    'search-dir': {
      describe: 'Folder to search'
    },
    'search-patterns': {
      describe: 'Glob pattern(s) to search'
    },
    'search-patterns-delimiter': {
      describe: 'Characters used within --search-patterns to split into mulitple values'
    },
    'search-patterns-file': {
      describe: 'Alternative to --search-patterns.  File to load patterns from'
    },

    'ignore-patterns': {
      describe: 'Glob pattern(s) to ignore'
    },
    'ignore-patterns-file': {
      describe: 'File containing glob patterns to ignore'
    },
    'ignore-patterns-delimiter': {
      describe: 'Characters used within --ignore-patterns to split into mulitple values'
    },
    'destination-dir': {
      describe: 'Folder path to store altered files'
    },

    'source-file': {
      describe: 'File containing lines of text to replace.'
    },
    'destination-file': {
      describe: 'Optional file path if changes should be written to a new file.'
    },

    'old-lines': {
      describe: 'Alternative to --old-lines-file.  Line to search for and replace'
    },
    'old-lines-delimiter': {
      describe: 'Characters used within --old-lines to split into mulitple lines'
    },
    'old-lines-file': {
      describe: 'Alternative to --old-lines.  File to load lines from'
    },
    'new-lines': {
      describe: 'Alternative to --new-lines-file.  Array of lines to write to destination file'
    },
    'new-lines-delimiter': {
      describe: 'Characters used within --new-lines to split into mulitple lines'
    },
    'new-lines-file': {
      describe: 'Alternative to --new-lines.  File to load lines from'
    },
    delimiter: {
      describe: 'Characters used within --old-lines and --new-lines to split into mulitple lines'
    },
    'empty-lines': {
      describe: 'Sets --empty-lines-new & --empty-lines-old.'
    },
    'empty-lines-new': {
      describe: 'Preserves empty lines at head and tail of new lines array or file.'
    },
    'empty-lines-old': {
      describe: 'Preserves empty lines at head and tail of old lines array or file.'
    },


    'case-sensitive': {
      describe: 'Forces a case-sensitive search on source file.'
    },
    'match-whitespace': {
      describe: 'Inlude whitespace when examining source file.'
    },
    'preserve-whitespace': {
      describe: 'Preserve whitespace at beginning and end of replaced line.'
    },
    overwrite: {
      describe: 'Allows the destination file to be overwritten if it exists.'
    },

    
    'backup-dir': {
      describe: 'Optional directory to store original files before altering.'
    },
    'backup-dir-date': {
      describe: 'Create a timestamp subdirectory within the backup directory.'
    },
    'temp-dir': {
      describe: 'Optional directory to use when generating files.'
    },
    'make-dirs': {
      describe: 'Creates the temp and destination folders if needed.'
    },

  });

const main = async () => {

  const opts = {};
  Object.keys(argv)
    .filter(_.isAlphanumeric)
    .forEach(key => {
      opts[key] = argv[key];
    });

  const results = await replace(opts);
  console.log(JSON.stringify(results, null, 2));
};

main();

