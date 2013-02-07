var bootcolor = require('./index.js')
	,tempdir = './dump'
	,ignoredfiles = []
var solarsupl = [ '#03303c', '#0e3b46', '#15404a', '#1c454e', '#234a52', '#2a4f56', '#31545a', '#38595e', '#3f5e62', '#466366', '#4d686a', '#5c7279', '#60767d', '#6b8086', '#718589', '#778a8c', '#7d8f8f', '#889899', '#8d9c9c', '#9ba7a5', '#a3ada9', '#abb3ad', '#b3b9b1', '#bbbfb5', '#c3c5b9', '#cbcbbd', '#d3d1c1', '#dbd7c5', '#e3ddc9', '#f3ecd9', '#f8f0dd' ];
var override = { 
'#0088cc': '#268bd2',
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
'#802420': '#ff443e'
};
// var solarized = ['#002b36','#073642','#586e75','#657b83','#839496','#93a1a1','#eee8d5','#fdf6e3','#b58900','#cb4b16','#dc322f','#d33682','#6c71c4','#268bd2','#2aa198','#859900'].concat(solarsupl);
var solarized = ['#002b36','#073642','#586e75','#657b83','#839496','#93a1a1','#eee8d5','#fdf6e3'].concat(solarsupl);

bootcolor.change(solarized,override,tempdir,tempdir,ignoredfiles,/colors\.less/);