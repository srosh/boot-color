var reg=/(#\w+)[;,\)\' ]|(rgba\([^\)]+\))/g;
var vars=[],used=[],page='@slashnine: /**/;\n\n\n';
var fs=require('fs');
var text=fs.readFileSync('./bootstrap.css').toString().replace(/\\9/g,'@slashnine'),rest=text;
var Colors=require('./colors.js');
var solarsupl = [ '#03303c',
  '#0e3b46',
  '#15404a',
  '#1c454e',
  '#234a52',
  '#2a4f56',
  '#31545a',
  '#38595e',
  '#3f5e62',
  '#466366',
  '#4d686a',
  '#5c7279',
  '#60767d',
  '#6b8086',
  '#718589',
  '#778a8c',
  '#7d8f8f',
  '#889899',
  '#8d9c9c',
  '#9ba7a5',
  '#a3ada9',
  '#abb3ad',
  '#b3b9b1',
  '#bbbfb5',
  '#c3c5b9',
  '#cbcbbd',
  '#d3d1c1',
  '#dbd7c5',
  '#e3ddc9',
  '#f3ecd9',
  '#f8f0dd' ];
var override = { '#0088cc': '#268bd2',
  '#0044cc': '#2647d2',
  '#002a80': '#26a5ff',
  '#5bc0de': '#2aa198',
  '#2f96b4': '#00776e',
  '#1f6377': '#3ad4d5',
  '#62c462': '#859900',
  '#51a351': '#747800',
  '#387038': '#9ecc19',
  '#fbb450': '#cb4b16',
  '#f89406': '#c82b00',
  '#ad6704': '#ff7818',
  '#ee5f5b': '#dc322f',
  '#bd362f': '#ab0903',
  '#802420': '#ff443e' };
// var solarized = ['#002b36','#073642','#586e75','#657b83','#839496','#93a1a1','#eee8d5','#fdf6e3','#b58900','#cb4b16','#dc322f','#d33682','#6c71c4','#268bd2','#2aa198','#859900'].concat(solarsupl);
var solarized = ['#002b36','#073642','#586e75','#657b83','#839496','#93a1a1','#eee8d5','#fdf6e3'].concat(solarsupl);
var col = new Colors(solarized,override);
while(m=reg.exec(text)) {
	//console.log(m);
	var color = m[1] || m[2];
	if(vars.indexOf(color)==-1) {
		vars.push(color);
		used.push(1);
	} else {
		used[vars.indexOf(color)]++;
	}
}
function max(a,b) { return a>b ? a : b; }
var maxcolorlen = 0;
var named={};
var nused={};
var varsunsorted=vars.slice();
vars.sort();
var j=1;
for (var i = 0; i < vars.length; i++) {
	var varname = '@var';
	var color = vars[i];
	var colorname = color;
	if(j<10) varname+='00'+j;
	else if(j<100) varname+='0'+j;
	else varname+=j;
	if (color.length==4) {
		colorname=color.replace(/#(\w)(\w)(\w)/g,'#$1$1$2$2$3$3');
	}
	maxcolorlen = max(maxcolorlen,colorname.length);
	if(named[colorname]) {
		varname = named[colorname];
		nused[colorname] += used[varsunsorted.indexOf(vars[i])]; 
		usedtimes = nused[colorname]
	} else {
		named[colorname]=varname;
		nused[colorname]=used[varsunsorted.indexOf(vars[i])];
		j++;
	}
	var val=color.replace('(','\\(').replace(')','\\)');
	var r=new RegExp(val+'([;,\)\' ])','g');
	//console.log(r,varname);
	// if (override[colorname]) console.log(colorname,override[colorname])
	// if (override[colorname]) rest.replace(r,override[colorname]+'$1');
	// else rest = rest.replace(r,col.closest(colorname)+'$1');
	rest = rest.replace(r,col.closest(colorname)+'$1');
};
function pad(times,ch) {
	ch = ch || ' ';
	var ret = '';
	for (var i = 0; i < times; i++) ret+=ch;
	return ret;
}
function numtohex(strnum) {
	var num = parseInt(strnum);
	return (num<10 ? '0' : '') + num.toString(16);
}
for (var colorname in named) {
	var converted = '',rgba;
	if(rgba=colorname.match(/rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0123456789\.]+)\s*\)/)){
		converted='=#'+numtohex(parseFloat(rgba[4])*255)+numtohex(rgba[1])+numtohex(rgba[2])+numtohex(rgba[3])+' ';
		colname = col.closest(colorname);
	} else {
		colname = col.closest(colorname);
	}
	page+= named[colorname]+':\t\t '+colname+' ;'+pad(maxcolorlen-colorname.length+4)+'// '+converted+'used '+nused[colorname]+' time(s)\n';
}
var parent = '';//'html.mycolor'
// page+='\n\n\n'+parent+' {\n\n'+rest+'\n\n}';
//page+='\n\n\n'+parent+'\n\n'+rest+'\n\n';
page = rest;
fs.writeFileSync('./bootstrapsolar.css',page)