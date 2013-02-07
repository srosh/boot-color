var lsjs = require('lsjs')
	,path = './dump/tests'
	,assets = '../../bootstrap/docs/assets'
var cssregex=/\.\.\/\.\.\/docs\/assets\/css\/bootstrap\.css/g;
var regex=/\.\.\/\.\.\/docs\/assets/g;
var test = lsjs.makeReplacer(path,cssregex,'./bootstrap.css');
test.cbs.push(lsjs.replace(regex,assets));
return test.writeResultsWhenDone(path).run()