const _ = require('../../utils');
const def = require('../definition');

const verifyFormats = (opts) => {

  const keys = Object.keys(def).filter(_.isValidString);

  const bools = keys.filter(key => (def[key].type === 'boolean'));
  const paths =  keys.filter(key => (def[key].type === 'string') && !def[key].isArray && def[key].isPath);
  const pathArrays =  keys.filter(key => (def[key].type === 'string') && def[key].isArray && def[key].isPath);
  const strings =  keys.filter(key => (def[key].type === 'string') && !def[key].isArray && !def[key].isPath);
  const stringArrays =  keys.filter(key => (def[key].type === 'string') && def[key].isArray && !def[key].isPath);

  const badBools = bools.filter(key => (!_.isBooleanIfSet(opts[key])));
  const badPaths = paths.filter(key => (!_.isValidPathIfSet(opts[key])));
  const badPathArrays = pathArrays.filter(key => (_.isSet(opts[key]))).filter(key => (
    !_.isValidArray(opts[key], def[key].allowEmpty) ||
    opts[key].filter(value => (!_.isValidPath(value))).length > 0
  ));
  const badStrings = strings.filter(key => (!_.isValidStringIfSet(opts[key], def[key].allowEmpty)));
  const badStringArrays = stringArrays.filter(key => (_.isSet(opts[key]))).filter(key => (
    !_.isValidArray(opts[key], def[key].allowEmpty) ||
    opts[key].filter(value => (!_.isValidString(value, def[key].allowEmpty))).length > 0
  ));

  const errors = [].concat(
    badBools,
    badPaths,
    badPathArrays,
    badStrings,
    badStringArrays
  ).filter(_.isValidString).map(key => {
    return `Invalid format for ${def[key].name.toLowerCase()}.`;
  });

  return errors;
};

module.exports = verifyFormats;
