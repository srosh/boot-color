var bootcolor = require('./index.js')
	,fs = require('fs')
	,tempdir = './dump'
	,targetdir = '.'
	,sourcedir = './bootstrap/less'
	,varfile = 'colors.less'
	,ignoredfiles = ['responsive.less','responsive-1200px-min.less','responsive-767px-max.less','responsive-768px-979px.less','responsive-navbar.less','responsive-utilities.less']

var colorvars = function() {
	return bootcolor.vars(sourcedir,tempdir,varfile,ignoredfiles,/\.less$/,false
	,function(){
		var text=fs.readFileSync('./dump/bootstrap.less','utf-8');
		fs.writeFileSync('./dump/bootstrap.less',text.replace('@import "reset.less";','@import "'+varfile+'";\n@import "reset.less";'));
	});
}

colorvars();