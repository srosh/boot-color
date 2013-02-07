var Colors = require('./colors.js');
var FSLS = require('lsjs');
var fs = require('fs');

var varsforcolors = function (path,topath,tofilename,ignorefiles,importAll,callback) { //path: directory of less/css files
	var varprefix = '@colorvar';
	var colorsfound = [];
	var regex=/#[0-9a-f]{6}|'#[0-9a-f]{8}'|#[0-9a-f]{3}|rgba\([^\)]+\)/g;
	fsls = FSLS.makeReplacer(path,regex,function(color){
		colorindex = colorsfound.indexOf(color);
		if (colorindex>-1) return varprefix+(colorindex+1);
		else return varprefix+colorsfound.push(color);
	},ignorefiles,[],function(fslsobj){
		var lines = [];
		colorsfound.map(function(color,index){
			lines.push('@colorvar'+(index+1)+': '+color+';');
		});
		if (importAll){
			lines.push('\n');
			fslsobj.ls.map(function(filename){
				lines.push('@import "'+filename+'";');
			});
		}
		fs.writeFileSync(topath+tofilename,lines.join('\n'));
		callback(fslsobj);
	}).writeResultsWhenDone(topath).run()
}
//'./bootstrap/less','./dump','/colors.less',['.gitignore']
var replaceless = function (colorArr,override) {
	this.colors = new Colors
	this.fsls = FSLS.makeReplacer('./bootstrap/less',/#\w+/g,function(){return '';},['.gitignore'])
	this.fsls.writeResultsWhenDone('./dump')
	this.fsls.run();
}

module.exports.vars = varsforcolors;
module.exports.colors = Colors;