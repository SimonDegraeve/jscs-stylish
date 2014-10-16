/*
 * jscs-stylish
 * https://github.com/SimonDegraeve/jscs-stylish
 *
 * Copyright 2014, Simon Degraeve
 * Licensed under the MIT license.
 */

var chalk = require('chalk'),
    table = require('text-table'),
    logSymbols = require('log-symbols'),
    stringLength = require('string-length');

function pluralize(str, count) {
  return str + (count === 1 ? '' : 's');
}

module.exports = function(errorCollection) {
  var errorCount = 0,
      report = [];

  report = errorCollection.map(function(errors, i) {
    if (!errors.isEmpty()) {
      errorCount += errors.getErrorCount();

      return [
        '',
        chalk.underline(errors.getFilename()),
        table(
          errors.getErrorList().map(function(error) {
            return [
              '',
              chalk.gray('line ' + error.line),
              chalk.gray('col ' + error.column),
              chalk.red(error.message)
            ]
          }),
          {
            stringLength: stringLength
          }
        )
      ].join('\n');
    }
    return '';
  }).join('\n') + '\n\n';

  if (errorCount > 0) {
    report += '  ' + logSymbols.error + '  ' + errorCount + pluralize(' error', errorCount);
  } else {
    report += '  ' + logSymbols.success + ' No problems';
    report = '\n' + report.trim();
  }

  console.log(report + '\n');
};
