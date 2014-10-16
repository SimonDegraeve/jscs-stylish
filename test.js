/*
* jscs-stylish
* https://github.com/SimonDegraeve/jscs-stylish
*
* Copyright 2014, Simon Degraeve
* Licensed under the MIT license.
*/

var assert = require('assert'),
  chalk = require('chalk'),
  Checker = require('jscs/lib/checker'),
  stylish = require('./index');

describe('jscs-stylish', function() {
  var checker = new Checker()
  checker.registerDefaultRules();

  it('should be used by JSCS', function() {

    var result = false,
        _log = process.stdout.write.bind(process.stdout);

    process.stdout.write = function(str) {
      // _log(str);
      if (/Illegal keyword: with/ig.test(chalk.stripColor(str || ''))) {
        result = true;
      }
    };

    checker.configure({
      disallowKeywords: ['with']
    });
    stylish([checker.checkString('with (x) { y++; }')]);

    process.stdout.write = _log;
    assert(result);
  });
});
