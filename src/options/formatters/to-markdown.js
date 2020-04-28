const _ = require('../../utils');
const def = require('../definition');

const COL_DELIM = '~';

const toMarkdown = (forCli) => {

  const lines = [
    ['Name', 'Description', 'Type', 'Default'].join(COL_DELIM)
  ];

  Object.keys(def).forEach(key => {

    const name = `\`${(forCli ? _.toKebabCase(key) : key)}\``;
    const desc = def[key].name;
    let type = '';
    if (def[key].type === 'boolean') {
      type = '`boolean`';
    } else if (def[key].isPath) {
      type = '`string (path)`';
    } else if (def[key].isArray) {
      type = '`string | string[]`';
    } else if (def[key] === 'string') {
      type = '`string`';
    }
    let defValue = '';
    switch (typeof def[key].default) {
      case 'boolean':
        defValue = (def[key].default === true) ? '`true`' : '`false`';
        break;
      case 'string':
        defValue = `\`${def[key].default}\``;
        break;
      case 'function':
        defValue = '`(function)`';
        break;
      default:
        defValue = '';
        break;
    }

    lines.push([name, desc, type, defValue].join(COL_DELIM));
  });

  return _.toTable(lines, COL_DELIM);
};

module.exports = toMarkdown;
