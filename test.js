fs = require('fs')
// r=require('lsjs')
// c = r.makeReplacer('./bootstrap/less',/#\w+/g,function(){return '';},['.gitignore'])
// c.writeResultsWhenDone('./dump')
// c.run();
t=require('./index.js');
t.vars('./bootstrap/less','./dump','/colors.less',
	['.gitignore','.git','.travis.yml','tests','responsive.less','responsive-1200px-min.less','responsive-767px-max.less','responsive-768px-979px.less','responsive-navbar.less','responsive-utilities.less'],false
	,function(){
		q=fs.readFileSync('./dump/bootstrap.less','utf-8');
		fs.writeFileSync('./dump/bootstrap.less',q.replace('@import "reset.less";','@import "reset.less";\n@import "colors.less";'));
	});