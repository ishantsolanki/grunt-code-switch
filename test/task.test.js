'use strict';
var fs = require('fs');
var htmlCode = fs.readFileSync('test/fixtures/index.html', 'utf8');
var jsCode = fs.readFileSync('test/fixtures/sample.js', 'utf8');

exports.testswitch = function(test) {
	test.ok(/<!-- env:dev -->/.test(htmlCode));
	test.ok(/<!-- env:prod --#>/.test(htmlCode));
	test.ok(/\/\* env:dev \*\//.test(jsCode));
	test.ok(/\/\* env:prod \*#\//.test(jsCode));
	test.done();
}
 