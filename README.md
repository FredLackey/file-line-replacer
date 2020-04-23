# file-line-replacer
Node-based file line replacer.

## Installation

```
npm i file-line-replacer
```

## Usage

```
const replacer = require('file-line-replacer');

const results = replacer({
  sourceFile  : '/Volumes/Source/my-project/models/cat.model.js',
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
| `overwrite` | `false` | Allows the destination file to be overwritten if it exists.  Required if the `sourceFile` and `destinationFile` are the same. |

## Changes

|  Date  |  Version  |  Details  |
|--------|-----------|-----------|
| `2020-04-23` | `v0.0.0` |  Work in progress.  Works well.  Need to add ability to overwrite working file.  |
|  | `v0.0.1` |  Create README just in case someone finds the repo before it's ready.  |