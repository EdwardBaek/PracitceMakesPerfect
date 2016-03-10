
function A( a ){
	this.a = a;
	return this.a;
}

A.prototype.test = function(){	
	console.log( this.a );
};
A.prototype.testUseInnerFunction = function(){
	this.test();
};

console.log( A( 'a' ) );

var newTest1 = new A( 'newTest1' );


console.log( '\n' );
console.info( 'newTest1 : ', newTest1 );
newTest1.test();
newTest1.testUseInnerFunction();

console.log( '\n' );
var newTest2 = new A( 'newTest2' );
console.info( 'newTest1 : ', newTest2 );
console.info( 'newTest2.test() : ' +newTest2.test() );

console.log( '\n' );
console.info( 'newTest1 : ', newTest1 );
console.info( 'newTest1.test() : ', newTest1.test() );
