const os = require('os');
const _ = require('../utils');

module.exports = {

  backupDir       : { type: 'string', isPath: true, name: 'Backup Directory' },
  backupDirDate   : { type: 'boolean', default: true, name: 'Append Date Flag for Backup Directory' },
  
  caseSensitive   : { type: 'boolean', default: false, name: 'Case Sensitive Flag' },
  
  delimiter       : { type: 'string', default: '|', allowBlank: true, name: 'Delimeter Character(s)' },
  destinationDir  : { type: 'string', isPath: true, name: 'Destination Directory', default: (opts) => (
                        _.isSet(opts.destinationDir) ? opts.destinationDir : opts.searchDir
                        ) },
  destinationFile : { type: 'string', isPath: true, name: 'Destination File', default: (opts) => (
                        _.isSet(opts.destinationFile)  
                          ? opts.destinationFile 
                          : (_.isSet(opts.sourceFile) && !_.isSet(opts.destinationDir)) 
                            ? opts.sourceFile
                            : undefined
                        ) },
  
  emptyLines      : { type: 'boolean', default: false, name: 'Preserve Empty Lines Flag' },
  emptyLinesNew   : { type: 'boolean', name: 'Preserve Empty for New Files Lines Flag', default: (opts) => (
                        _.isSet(opts.emptyLinesNew) ? opts.emptyLinesNew : opts.emptyLines
                        ) },
  emptyLinesOld   : { type: 'boolean', name: 'Preserve Empty for Old Files Lines Flag', default: (opts) => (
                        _.isSet(opts.emptyLinesOld) ? opts.emptyLinesOld : opts.emptyLines
                        ) },
  
  ignorePatterns          : { type: 'string', isArray: true, trim: false, name: 'Ignore Pattern(s)' },
  ignorePatternsDelimiter : { type: 'string', allowBlank: true, name: 'Ignore Patterns Delimeter', default: (opts) => (
                        _.isSet(opts.ignorePatternsDelimiter) ? opts.ignorePatternsDelimiter : opts.delimiter
                        ) },
  ignorePatternsFile        : { type: 'string', isPath: true, name: 'Ignore Patterns File' },
  
  makeDirs            : { type: 'boolean', default: true, name: 'Make Directories Flag' },
  matchWhitespace     : { type: 'boolean', default: false, name: 'Match Whitespace Flag' },
  
  newLines            : { type: 'string', isArray: true, allowEmpty: true, name: 'New Line(s)' },
  newLinesDelimiter  : { type: 'string', allowBlank: true, name: 'New Lines Delimeter', default: (opts) => (
                        _.isSet(opts.newLinesDelimiter) ? opts.newLinesDelimiter : opts.delimiter
                        ) },
  newLinesFile        : { type: 'string', isPath: true, name: 'New Lines File'  },

  oldLines           : { type: 'string', isArray: true, allowEmpty: false, name: 'Old Line(s)' },
  oldLinesDelimiter  : { type: 'string', allowBlank: true, name: 'Old Lines Delimeter', default: (opts) => (
                        _.isSet(opts.oldLinesDelimiter) ? opts.oldLinesDelimiter : opts.delimiter
                        ) },
  oldLinesFile        : { type: 'string', isPath: true, name: 'Old Lines File'  },

  overwrite : { type: 'boolean', default: false, name: 'Overwrite Files Flag' },

  preserveWhitespace : { type: 'boolean', default: true, name: 'Preserve Whitespace Flag' },

  searchDir           : { type: 'string', isPath: true, name: 'Search Directory' },
  searchPatterns      : { type: 'string', name: 'Search Pattern(s)' },
  searchPatternsFile  : { type: 'string', isPath: true, name: 'Search Patterns File' },
  sourceFile          : { type: 'string', isPath: true, name: 'Source File' },

  tempDir : { type: 'string', isPath: true, name: 'Custom Temp Directory', default: (opts) => (
    _.isSet(opts.tempDir) ? opts.tempDir : os.tmpdir()
    ) }
};
