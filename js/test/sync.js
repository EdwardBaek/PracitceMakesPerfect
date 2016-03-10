/*
var serverLoadValue = 0;
var highServerLoadValue = 0;


function print( str ){
	console.log( 'print' + str );
	(function(){
	setTimeout(
		function(){ 
			console.log( 'returned - ' + str );
			console.log( 'serverLoadValue - ' + serverLoadValue );
			serverLoadValue -= 1;
			checkLoadValue();
			console.info( 'highServerLoadValue', highServerLoadValue ); 
		}, Math.random() * 10 );
	});
} 
function returnServerJob( index ){
	
}

// function serverLoop(){
// 	for( var i = 0; i < 10000000000; ++i ){
// 		(function(){
// 			var index = i;
// 			console.info( 'inner-', index );
// 			print( index );
// 			serverLoadValue += 1;
// 			checkLoadValue();
// 			console.log( 'serverLoadValue - ' + serverLoadValue ); 
// 		})();
// 	}
// }


function serverLoop(){
	for( var i = 0; i < 1000000; ++i ){
		console.log('input : ' + i );
		thread(i);
	}
}
function recursive(){
	recursive();
}

function checkLoadValue(){
	if( highServerLoadValue < serverLoadValue )
		highServerLoadValue = serverLoadValue;
}
*/

var _g_serverLoadValue = 0;
var _g_highServerLoadValue = 0;
var limit = 100;
var threadCount = 0;
function thread(){
	++threadCount;
	if( threadCount < limit ){
		doSomething();
		setTimeout(
			function(){
				thread();
			}, 1
		);
	}else{
		console.log('******excute done*****');
	}
}

function doSomething(){
	_g_serverLoadValue += 1;
	var resultNum = _g_serverLoadValue;
	console.log('_g_serverLoadValue : ' + _g_serverLoadValue);
	setTimeout(
		function(){
			result( resultNum );
		}, getRandomWaitingTime()
	);
}
function result(i){
	console.log( 'return : ' + i );
	_g_serverLoadValue -= 1;
	checkLoadValue();
	console.log('_g_highServerLoadValue/_g_serverLoadValue : ' + _g_highServerLoadValue +'/' + _g_serverLoadValue );
}
function getRandomWaitingTime(){
	return ( Math.random() * Math.random() * 1000 );
}

function checkLoadValue(){
	if( _g_highServerLoadValue < _g_serverLoadValue )
		_g_highServerLoadValue = _g_serverLoadValue;
}

thread();