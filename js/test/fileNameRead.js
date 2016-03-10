

var fs = require('fs');
var path = './';

var strArray = '';
strArray += '['
fs.readdir(path, function (err, files) {
	if(err) throw err;

	// console.info( files );
	for( var i = 0; i < files.length; ++i ){
		files[i] = files[i].substr( 0, files[i].length - 4 );
	}
	console.info( files );
		
});
strArray += ']'
console.log(strArray);
