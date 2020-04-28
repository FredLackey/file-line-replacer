const path = require('path');
const _ = require('../utils');

const makePaths = async (opts) => {

  const badOut = _.unique(opts._files
    .filter(file => (_.isValidString(file.out) && _.isValidArray(file.blocks)))
    .map(file => (path.dirname(file.out))))
    .filter(dir => (!_.makePath(dir)));

  if (badOut.length === 1) {
    return ['Backup directory could not be created.'];
  }
  if (badOut.length > 1) {
    return ['Backup directories could not be created.'];
  }
    
  const badTemp = _.unique(opts._files
    .filter(file => (_.isValidString(file.temp)))
    .map(file => (path.dirname(file.temp))))
    .filter(dir => (!_.makePath(dir)));

  if (badTemp.length === 1) {
    return ['Temp directory could not be created.'];
  }
  if (badTemp.length > 1) {
    return ['Temp directories could not be created.'];
  }
    
  const badSave = _.unique(opts._files
    .filter(file => (_.isValidString(file.save)))
    .map(file => (path.dirname(file.save))))
    .filter(dir => (!_.makePath(dir)));

  if (badSave.length === 1) {
    return ['Destination directory could not be created.'];
  }
  if (badSave.length > 1) {
    return ['Destination directories could not be created.'];
  }

  return [];
};

module.exports = makePaths;
