# File Line Replacer for NodeJS

**A command line version is available!**  
This utility may be used from the command line by installing the CLI [`file-line-replacer-cli`](https://github.com/FredLackey/file-line-replacer).  For more information on that project, please visit: [https://github.com/FredLackey/file-line-replacer](https://github.com/FredLackey/file-line-replacer)

## Purpose  
Matches multiple lines within large text files and replaces those lines with another set of lines while optionally preserving whitespace.  Both the old and new sets of lines may be passed in or read from a file.  Of course, the original file may be automatically backed up, if desired.

## Installation

```
npm i file-line-replacer
```

## Usage

```
const replacer = require('file-line-replacer');

const results = replacer({
  sourceFile  : '/Volumes/Source/my-project/models/cat.model.js',
  backupDir   : '/Volumes/Source/my-project/_backup/models/,
  oldLines : [
    'type: DataTypes.INTEGER.UNSIGNED,',
    'allowNull: false,',
    'primaryKey: true'  
  ],
  oldLines : [
    'type: DataTypes.INTEGER.UNSIGNED,',
    'autoIncrement: true,',
    'primaryKey: true'  
  ],
  overwrite: true
  preserveWhitespace: true
});
```

### Options

|  Property  |  Default  |  Details  |
|------------|-----------|-----------|
| `sourceFile` |  |  File containing lines of text to replace.  |
| `destinationFile` |  | Optional file path if changes should be written to a new file. |
| `tempDir` |  | Optional directory path to use while generating the new file. |
| `backupDir` |  | Optional directory to store original files before altering. |
| `backupDirDate` | `true` | Creates a timestamp subdirectory within the `backupDir`.  |
| `makeDirs` | `true` | Creates the `tempDir` and folder for `destinationFile` if it does not exist.  |
| `oldLines` |  |  Alternative to `oldLinesFile`.  Array of specific lines to search for and replace. |
| `oldLineFile` |  |  Alternative to `oldLines`.  Test file containing lines to search for an replace.  |
| `newLines` |  |  Alternative to `newLinesFile`.  Array of specific lines to write to destination file. |
| `newLineFile` |  |  Alternative to `newLines`.  Test file containing lines to write to destination file.  |
| `emptyLines` | `false` |  Equivilent to setting both `emptyLinesNew` and `emptyLinesFalse`. |
| `emptyLinesNew` | `false` | Preserves empty lines at head and tail of new lines array or file. |
| `emptyLinesOld` | `false` | Preserves empty lines at head and tail of old lines array or file. |
| `caseSensitive` | `false` | Forces a case-sensitive search on source file. |
| `matchWhitespace` | `false` | Forces the whitespace to be included when examining lines of the file. |
| `preserveWhitespace` | `false` | Attempts to preserve the white space at the start and end of each line.  |
| `overwrite` | `false` | Allows the destination file to be overwritten if it exists.  Required if the `destinationFile` already exists and when overwriting the `sourceFile`. |

## Changes

|  Date  |  Version  |  Details  |
|--------|-----------|-----------|
| `2020-04-23` | `v0.0.0` |  _WIP_  Works well.  Need to add ability to overwrite working file.  |
|  | `v0.0.1` |  Create README just in case someone finds the repo before it's ready.  |
| `2020-04-23` | `v0.1.0` |  _WIP_  Added overwrite and custom `tempDir` functionality.  |
| `2020-04-24` | `v0.2.0` |  _WIP_  Added `backupDir` & `makeDirs` functionality.  |
|  | `v0.2.1` |  _WIP_  Added `backupDirDate` functionality.  |
