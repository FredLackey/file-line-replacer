const def = require('../definition');

const unknownsCheck = opts => {

  return Object.keys(opts)
    .filter(key => (typeof def[key] === 'undefined'))
    .map(key => (`Unkown option supplied: ${key}`));

};

module.exports = unknownsCheck;
