var hexreg = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$|#([0-9a-f]{1})([0-9a-f]{1})([0-9a-f]{1})$/
var rgbareg= /rgba\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0123456789\.]+)\s*\)/
var colors = function(imp,override){
	this.colors = {}
	if(imp) this.import(imp);
	this.override={};
	if(override) {
		for( var key in override) {
			this.override[key] = parse(override[key]);
		}
	}
}
colors.prototype = {
	import: function (arr) {
		for (var i = 0; i < arr.length; i++) {
			this.colors[arr[i]]=parse(arr[i]);
		};
	},
	differ: function (pcolor){
		res={};
		for (var i in this.colors) {
			res[i]=diff(this.colors[i],pcolor);
			res[i][3]=Math.abs(res[i][0])+Math.abs(res[i][1])+Math.abs(res[i][2]);
		}
		return res;
	},
	closest: function (color){
		var pcolor = parse(color);
		if(pcolor===null) return color;
		if(this.override[hex(pcolor)]) return like(this.override[hex(pcolor)],color);
		var results = this.differ(pcolor),min=255*3,best;
		for (var i in results) {
			if(min>results[i][3]) {
				min=results[i][3];
				best=i;
			}
		}
		return like(this.colors[best],color);
	}
}

//funcs
var like = function (parsed,formatted) {
	if(hexreg.test(formatted)) return hex(parsed);
	var rgba=formatted.match(rgbareg);
	if (rgba) return crgba(parsed,rgba[4]);
	return null;
}
var hex = function (rgb) {
	var b16 = function(n) { return  n<0 ? '00' : ( n>255 ? 'ff' : (n<16 ? '0'+n.toString(16) : n.toString(16))); }
	return '#'+b16(rgb[0])+b16(rgb[1])+b16(rgb[2]);
}
var add = function (rgb,plusrgb) {
	return [rgb[0]+plusrgb[0],rgb[1]+plusrgb[1],rgb[2]+plusrgb[2]];
}
var div = function (rgb,n) {
	return [parseInt(rgb[0]/n),parseInt(rgb[1]/n),parseInt(rgb[2]/n)];
}
var mid = function(c1,c2) {
	return add(c1,div(diff(c2,c1),2));
}
var interpolate = function(c1,c2,steps) {
	var inter=[];
	var lastc=c1, plus = div(diff(c2,c1),steps);
	for (var i=1;i<steps;i++) {
		lastc=add(lastc,plus);
		inter.push(lastc);
	}
	return inter;
}
var parse = function (color) {
	var rgb=color.match(hexreg);
	var rgba=color.match(rgbareg);
	if (rgb) {
		if (rgb[1]) return [parseInt(rgb[1],16),parseInt(rgb[2],16),parseInt(rgb[3],16)];
		if (rgb[4]) return [parseInt(rgb[4]+rgb[4],16),parseInt(rgb[5]+rgb[5],16),parseInt(rgb[6]+rgb[6],16)];
		return null;
	}
	else if (rgba) return [parseInt(rgba[1],10),parseInt(rgba[2],10),parseInt(rgba[3],10)];
	else return null;
}
var crgba = function(rgb,alpha) {
	return 'rgba('+rgb[0]+', '+rgb[1]+', '+rgb[2]+', '+alpha+')';
}
var diff = function (c1,c2) {
	return [c1[0]-c2[0],c1[1]-c2[1],c1[2]-c2[2]];
}

//class funcs
colors.hex=hex;
colors.add=add;
colors.div=div;
colors.mid=mid;
colors.interpolate=interpolate;
colors.parse=parse;
colors.rgba=crgba;
colors.diff=diff;

module.exports = colors;