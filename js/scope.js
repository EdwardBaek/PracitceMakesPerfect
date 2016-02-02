function scopeTest(){
	var a = 10;
	if( true ){
		(function test(){
		console.log( "a=" + a );	
		var b = 13;
		for( var c = 0; c < 5; ++c ){
			console.log( "c=" + c );
		}
		console.log( "c=" + c );
	console.log( "b=" + b );
		})();
	}
}

scopeTest();