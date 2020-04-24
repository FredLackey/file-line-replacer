#!/usr/bin/env node

const _ = require('./utils');

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
    'search-pattern': {
      describe: 'Glob pattern to search'
    },
    'ignore-pattern': {
      describe: 'Glob pattern to ignore'
    },
    'ignore-patterns-file': {
      describe: 'File containing glob patterns to ignore'
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
    'old-lines-file': {
      describe: 'Alternative to --old-lines.  Line to search for and replace'
    },
    'new-lines': {
      describe: 'Alternative to --new-lines-file.  Array of lines to write to destination file'
    },
    'new-lines-file': {
      describe: 'Alternative to --new-lines.  Text file containing lines to write to destination file.'
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



    'temp-dir': {
      describe: 'Optional directory to use when generating files.'
    },
    'backup-dir': {
      describe: 'Optional directory to store original files before altering.'
    },
    'backup-dir-date': {
      describe: 'Create a timestamp subdirectory within the backup directory.'
    },
    'make-dirs': {
      describe: 'Creates the temp and destination folders if needed.'
    },

  });

const params = {};
Object.keys(argv)
  .filter(_.isAlphanumeric)
  .forEach(key => {
    params[key] = argv[key];
  });

console.log(JSON.stringify(params, null, 2));
