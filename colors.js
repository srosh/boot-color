var hexreg = /#(\w\w)(\w\w)(\w\w)$/
var rgbareg= /rgba\(([0-9]+),\s([0-9]+),\s([0-9]+),\s([0123456789\.]+)\)/
var colors = function(imp,override){
	this.colors = {}
	if(imp) this.import(imp);
	if(override) this.override = override;
	else this.override={};
}
colors.prototype = {
	import: function (arr) {
		for (var i = 0; i < arr.length; i++) {
			this.colors[arr[i]]=parse(arr[i]);
		};
	},
	differ: function (color){
		color = parse(color);
		res={};
		for (var i in this.colors) {
			res[i]=diff(this.colors[i],color);
			res[i][3]=Math.abs(res[i][0])+Math.abs(res[i][1])+Math.abs(res[i][2]);
		}
		return res;
	},
	closest: function (color){
		if(this.override[color]) return this.override[color];
		if(parse(color)===null) return color;
		var results = this.differ(color),m=255*3,best;
		var rgba;
		rgba=color.match(rgbareg);
		for (var i in results) {
			if(m>results[i][3]) {
				m=results[i][3];
				best=i;
			}
		}
		if (rgba) best = crgba(this.colors[best],rgba[4]);
		return best;
	}
}

//funcs
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
	if (rgb) return [parseInt(rgb[1],16),parseInt(rgb[2],16),parseInt(rgb[3],16)];
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