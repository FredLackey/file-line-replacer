# File Line Replacer for NodeJS

>  The following document applies to the programaticc usage of `file-line-replacer`.  For use from the command line, please see the [main README located here](README.md).

## Purpose  
Matches multiple lines within large text files and replaces those lines with another set of lines while optionally preserving whitespace.  Both the old and new sets of lines may be passed in or read from a file.  Of course, the original file may be automatically backed up, if desired.

> More info on _why_ I created this is on my blog: [https://fredlackey.com](https://www.fredlackey.com/2020/04/29/file-line-replacer/)

## Installation

```
npm i file-line-replacer
```

## Usage

```
const flr = require('file-line-replacer');

const results = await flr.replace({
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

| Name                      | Description                             | Type                | Default      |
|---------------------------|-----------------------------------------|---------------------|--------------|
| `backupDir`               | Backup Directory                        | `string (path)`     |              |
| `backupDirDate`           | Append Date Flag for Backup Directory   | `boolean`           | `true`       |
| `caseSensitive`           | Case Sensitive Flag                     | `boolean`           | `false`      |
| `delimiter`               | Delimeter Character(s)                  |                     | `|`          |
| `destinationDir`          | Destination Directory                   | `string (path)`     | `(function)` |
| `destinationFile`         | Destination File                        | `string (path)`     | `(function)` |
| `emptyLines`              | Preserve Empty Lines Flag               | `boolean`           | `false`      |
| `emptyLinesNew`           | Preserve Empty for New Files Lines Flag | `boolean`           | `(function)` |
| `emptyLinesOld`           | Preserve Empty for Old Files Lines Flag | `boolean`           | `(function)` |
| `ignorePatterns`          | Ignore Pattern(s)                       | `string | string[]` |              |
| `ignorePatternsDelimiter` | Ignore Patterns Delimeter               |                     | `(function)` |
| `ignorePatternsFile`      | Ignore Patterns File                    | `string (path)`     |              |
| `makeDirs`                | Make Directories Flag                   | `boolean`           | `true`       |
| `matchWhitespace`         | Match Whitespace Flag                   | `boolean`           | `false`      |
| `newLines`                | New Line(s)                             | `string | string[]` |              |
| `newLinesDelimiter`       | New Lines Delimeter                     |                     | `(function)` |
| `newLinesFile`            | New Lines File                          | `string (path)`     |              |
| `oldLines`                | Old Line(s)                             | `string | string[]` |              |
| `oldLinesDelimiter`       | Old Lines Delimeter                     |                     | `(function)` |
| `oldLinesFile`            | Old Lines File                          | `string (path)`     |              |
| `overwrite`               | Overwrite Files Flag                    | `boolean`           | `false`      |
| `preserveWhitespace`      | Preserve Whitespace Flag                | `boolean`           | `true`       |
| `searchDir`               | Search Directory                        | `string (path)`     |              |
| `searchPatterns`          | Search Pattern(s)                       |                     |              |
| `searchPatternsFile`      | Search Patterns File                    | `string (path)`     |              |
| `sourceFile`              | Source File                             | `string (path)`     |              |
| `tempDir`                 | Custom Temp Directory                   | `string (path)`     | `(function)` |

### Contact  
Please feel free to contact me directly with any questions, comments, or enhancement requests:

**Fred Lackey**  
**[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)**  
**[http://fredlackey.com](http://www.fredlackey.com)**  
