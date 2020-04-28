# File Line Replacer for NodeJS

>  The following document applies to the programaticc usage of `file-line-replacer`.  For use from the command line, please see the [main README located here](README.md).

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
| `oldLineFile` |  |  Alternative to `oldLines`.  Test file containing lines to search for and replace.  |
| `newLines` |  |  Alternative to `newLinesFile`.  Array of specific lines to write to destination file. |
| `newLineFile` |  |  Alternative to `newLines`.  Test file containing lines to write to destination file.  |
| `emptyLines` | `false` |  Equivilent to setting both `emptyLinesNew` and `emptyLinesOld`. |
| `emptyLinesNew` | `false` | Preserves empty lines at head and tail of new lines array or file. |
| `emptyLinesOld` | `false` | Preserves empty lines at head and tail of old lines array or file. |
| `caseSensitive` | `false` | Forces a case-sensitive search on source file. |
| `matchWhitespace` | `false` | Forces the whitespace to be included when examining lines of the file. |
| `preserveWhitespace` | `false` | Attempts to preserve the white space at the start and end of each line.  |
| `overwrite` | `false` | Allows the destination file to be overwritten if it exists.  Required if the `destinationFile` already exists and when overwriting the `sourceFile`. |

### Contact  
Please feel free to contact me directly with any questions, comments, or enhancement requests:

**Fred Lackey**  
**[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)**  
**[http://fredlackey.com](http://www.fredlackey.com)**  
