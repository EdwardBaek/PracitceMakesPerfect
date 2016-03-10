require('http').createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	var left = 1000;
	var interval = setInterval(function() {
		for(var i = 0; i< 10; i++) {
			res.write(Date.now() + " ");
		}
		if (-- left === 0) {
			clearInterval(interval);
			res.end();
		}
	}, 500);
}).listen(4000);