# File Line Replacer for NodeJS

>  The following document applies to the command-line usage of `file-line-replacer`.  For usage directly in a Node application, please see the [alternate README located here](README-ALT.md).

## Purpose  
Matches multiple lines within large text files and replaces those lines with another set of lines while optionally preserving whitespace.  Both the old and new sets of lines may be passed in or read from a file.  Of course, the original file may be automatically backed up, if desired.

## Installation

```
npm i -g file-line-replacer
```

## Usage

```
file-line-replacer \
  --source-file "/Volumes/Source/my-project/models/cat.model.js" \
  --old-lines "allowNull: false,|primaryKey: true"
  --new-lines "autoIncrement: true,|primaryKey: true" \
  --overwrite
```

```
file-line-replacer \
  --search-dir "/Users/flackey/Source/aws/res-useragent-data-api/src/data/models" \
  --backup-dir "/Users/flackey/Source/aws/res-useragent-data-api/_backup" \
  --old-lines "type: DataTypes.INTEGER.UNSIGNED,|allowNull: false,|primaryKey: true" \
  --new-lines "type: DataTypes.INTEGER.UNSIGNED,|autoIncrement: true,|primaryKey: true" \
  --overwrite
```

### Parameters
| Name                        | Description                             | Type                | Default      |
|-----------------------------|-----------------------------------------|---------------------|--------------|
| `backup-dir`                | Backup Directory                        | `string (path)`     |              |
| `backup-dir-date`           | Append Date Flag for Backup Directory   | `boolean`           | `true`       |
| `case-sensitive`            | Case Sensitive Flag                     | `boolean`           | `false`      |
| `delimiter`                 | Delimeter Character(s)                  |                     | `|`          |
| `destination-dir`           | Destination Directory                   | `string (path)`     | `(function)` |
| `destination-file`          | Destination File                        | `string (path)`     | `(function)` |
| `empty-lines`               | Preserve Empty Lines Flag               | `boolean`           | `false`      |
| `empty-lines-new`           | Preserve Empty for New Files Lines Flag | `boolean`           | `(function)` |
| `empty-lines-old`           | Preserve Empty for Old Files Lines Flag | `boolean`           | `(function)` |
| `ignore-patterns`           | Ignore Pattern(s)                       | `string | string[]` |              |
| `ignore-patterns-delimiter` | Ignore Patterns Delimeter               |                     | `(function)` |
| `ignore-patterns-file`      | Ignore Patterns File                    | `string (path)`     |              |
| `make-dirs`                 | Make Directories Flag                   | `boolean`           | `true`       |
| `match-whitespace`          | Match Whitespace Flag                   | `boolean`           | `false`      |
| `new-lines`                 | New Line(s)                             | `string | string[]` |              |
| `new-lines-delimiter`       | New Lines Delimeter                     |                     | `(function)` |
| `new-lines-file`            | New Lines File                          | `string (path)`     |              |
| `old-lines`                 | Old Line(s)                             | `string | string[]` |              |
| `old-lines-delimiter`       | Old Lines Delimeter                     |                     | `(function)` |
| `old-lines-file`            | Old Lines File                          | `string (path)`     |              |
| `overwrite`                 | Overwrite Files Flag                    | `boolean`           | `false`      |
| `preserve-whitespace`       | Preserve Whitespace Flag                | `boolean`           | `true`       |
| `search-dir`                | Search Directory                        | `string (path)`     |              |
| `search-patterns`           | Search Pattern(s)                       |                     |              |
| `search-patterns-file`      | Search Patterns File                    | `string (path)`     |              |
| `source-file`               | Source File                             | `string (path)`     |              |
| `temp-dir`                  | Custom Temp Directory                   | `string (path)`     | `(function)` |

### Contact  
Please feel free to contact me directly with any questions, comments, or enhancement requests:

**Fred Lackey**  
**[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)**  
**[http://fredlackey.com](http://www.fredlackey.com)**  
