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
  --source-file "/Volumes/Source/my-project/models/cat.model.js" \
  --backup-dir "/Volumes/Source/my-project/_backup/models/
  --old-lines-file "/Volumes/Source/my-project/_templates/auto-increment-old.txt"
  --new-lines-file "/Volumes/Source/my-project/_templates/auto-increment-old.txt" \
  --overwrite \
  --preserve-whitespace
```

### Options
There are two main ways to use this package.  You may either *search* for files to replace _or_ you may specify a file to search.

#### Options for Searching Multiple Files  
|  Property  |  Default  |  Details  |
|------------|-----------|-----------|
| `--search-dir` |  |  File containing lines of text to replace.  |
| `--search-pattern` | `**/*.*` |  File containing lines of text to replace.  |
| `--ingore-pattern` |  |  File containing lines of text to replace.  |
| `--ingore-patterns-file` |  |  File containing lines of text to replace.  |
| `--destination-dir` |  | Optional file path if changes should be written to a new file. |

#### Options for Searching a Single File  
|  Property  |  Default  |  Details  |
|------------|-----------|-----------|
| `--source-file` |  |  File containing lines of text to replace.  |
| `--destination-file` |  | Optional file path if changes should be written to a new file. |

#### Common Options
|  Property  |  Default  |  Details  |
|------------|-----------|-----------|
| `--temp-dir` |  | Optional directory path to use while generating the new file. |
| `--backup-dir` |  | Optional directory to store original files before altering. |
| `--backup-dir-date` | `true` | Creates a timestamp subdirectory within the `backupDir`.  |
| `--make-dirs` | `true` | Creates the `tempDir` and folder for `destinationFile` if it does not exist.  |
| `--old-lines` |  |  Alternative to `--old-lines-file`. Line to search for and replace. |
| `--old-lines-file` |  |  Alternative to `--old-lines`.  Test file containing lines to search for and replace.  |
| `--new-lines` |  |  Alternative to `--new-lines-file`.  Array of specific lines to write to destination file. |
| `--new-lines-file` |  |  Alternative to `--new-lines`.  Test file containing lines to write to destination file.  |
| `--delimiter` | `|` |  Characters used within `--old-lines` and `--new-lines` to split value into multiple lines.  |
| `--empty-lines` | `false` |  Equivilent to setting both `--empty-lines-new` and `--empty-lines-old`. |
| `--empty-lines-new` | `false` | Preserves empty lines at head and tail of new lines array or file. |
| `--empty-lines-old` | `false` | Preserves empty lines at head and tail of old lines array or file. |
| `--case-sensitive` | `false` | Forces a case-sensitive search on source file. |
| `--match-whitespace` | `false` | Forces the whitespace to be included when examining lines of the file. |
| `--preserve-whitespace` | `false` | Attempts to preserve the white space at the start and end of each line.  |
| `--overwrite` | `false` | Allows the destination file to be overwritten if it exists.  Required if the `--destination-file` already exists and when overwriting the `--source-file`. |

### Contact  
Please feel free to contact me directly with any questions, comments, or enhancement requests:

**Fred Lackey**  
**[fred.lackey@gmail.com](mailto://fred.lackey@gmail.com)**  
**[http://fredlackey.com](http://www.fredlackey.com)**  
