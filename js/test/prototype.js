
function A( a ){
	this.a = a;
	return this.a;
}

A.prototype.test = function(){	
	console.log( this.a );
}

console.log( A( 'a' ) );

var newTest1 = new A( 'newTest1' );


console.log( newTest1 );
console.log( newTest1.test() );

var newTest2 = new A( 'newTest2' );
console.log( newTest2 );
console.log( newTest2.test() );


console.log( newTest1 );
console.log( newTest1.test() );
