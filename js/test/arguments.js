var func1 = function func1(/*...args*/){
	for( var i = 0 ; i < arguments.length; ++i ){
		if( typeof arguments[i] === 'function' )
			arguments[i]('p');
	}
	console.log('\n');
	console.info( 'arguments', arguments );
	console.info( 'arguments.length', arguments.length );
	console.info( 'arguments.callee', arguments.callee );
	console.info( 'arguments.caller', arguments.caller );


}

var param1 = 0;
var param2 = 'string';
var param3 = [];
var param4 = 
{
	value : "value"
};
var param5 = function(str){
	console.log(str);
}


func1(param1);
func1(param2);
func1(param3);
func1(param4);
func1(param5);

func1(param1, param2, param3, param4, param5);