#!/usr/bin/env node

const _           = require('./utils');
const options     = require('./options');
const { replace } = require('./index');

const { argv } = require('yargs').options(options.formatters.toYargs());

const main = async () => {

  const opts = {};
  Object.keys(argv)
    .filter(_.isAlphanumeric)
    .forEach(key => {
      opts[key] = argv[key];
    });

  if (_.isSet(opts.markdown) || _.isSet(opts.cliMarkdown) || _.isSet(opts.markdownCli)) {
    const lines = options.formatters.toMarkdown(_.isSet(opts.cliMarkdown) || _.isSet(opts.markdownCli));
    lines.forEach(line => {
      console.log(line);
    });
    return;
  }

  const { files, errors } = await replace(opts);
  const hasErrors = _.isValidArray(errors);
  const hasSuccess = _.isValidArray(files) && files.filter(x => (x && x.success === true)).length > 0;

  if (hasErrors) {
    errors.forEach(err => {
      console.error(`Error: ${err}`);
    });
  }
  if (hasSuccess) {
    files.filter(file => (file && file.success)).forEach(file => {
      console.info(file.out);
    });
  }
  if (!hasErrors && !hasSuccess) {
    console.info('Nothing to do.');
  }
};

main();

