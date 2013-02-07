var Colors = require('./colors.js');
var lsjs = require('lsjs');
var fs = require('fs');

var varsforcolors = function (path,topath,tofilename,ignorefiles,filter,importAll,callback,varprefix) { //path: directory of less/css files
	var varprefix = varprefix || '@colorvar';
	var colorsfound = [];
	var regex=/#[0-9a-f]{6}|'#[0-9a-f]{8}'|#[0-9a-f]{3}|rgba\([^\)]+\)/g;
	return lsjs.makeReplacer(path,regex,function(color){
		colorindex = colorsfound.indexOf(color);
		if (colorindex>-1) return varprefix+(colorindex+1);
		else return varprefix+colorsfound.push(color);
	},ignorefiles,filter,function(obj){
		var lines = [];
		colorsfound.map(function(color,index){
			lines.push('@colorvar'+(index+1)+': '+color+';');
		});
		if (importAll){ // import all traversed files if importAll
			lines.push('\n');
			obj.ls.map(function(filename){
				lines.push('@import "'+filename+'";');
			});
		}
		fs.writeFileSync(topath+'/'+tofilename,lines.join('\n'));
		callback(obj);
	}).writeResultsWhenDone(topath).run()
}
var changeColors = function (colorArr,override,path,topath,ignorefiles,filter) {
	this.colors = new Colors(colorArr,override);
	var regex=/#[0-9a-f]{6}|'#[0-9a-f]{8}'|#[0-9a-f]{3}|rgba\([^\)]+\)/g;
	return lsjs.makeReplacer(path,regex,this.colors.closest.bind(this.colors),ignorefiles,filter).writeResultsWhenDone(topath).run()
}

module.exports.vars = varsforcolors;
module.exports.change = changeColors;
module.exports.colors = Colors;