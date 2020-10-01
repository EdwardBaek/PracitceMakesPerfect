function Marsupial(name, nocturnal) {
  if(!(this instanceof Marsupial)) {
    return new Marsupial(name, nocturnal);
  }
  this.name = name;
  this.isNocturnal = nocturnal;
}
// Each object instance gets its own copy of isAwake
Marsupial.prototype.isAwake = function(isNight) {
  return isNight === this.isNocturnal
}

function Kangaroo(name) {
  if(!(this instanceof Kangaroo)){
    throw new Error("this object must be created with new");
  }
  this.name = name;
  this.isNocturnal = false;
}

Kangaroo.prototype = new Marsupial();
Kangaroo.prototype.hop = function(){
  return this.name + " just hopped!";
}
var jester = new Kangaroo('Jester');
console.log(jester.nmame);

var isNightTime = false;
console.log(jester.isAwake(isNightTime)); // true
console.log(jester.hop());  // 'Jester just hopped!'

console.log(jester instanceof Kangaroo); // true
console.log(jester instanceof Marsupial); // true

// Initialization login is repeated in the inheriting and inherited object creation functions.
// Prototype sharing does reduce thenumber of copies of a function, however.
console.log('jester');
console.dir(jester);
console.log('jester.constructor');
console.dir(jester.constructor);
console.log('jester.__proto__:');
console.dir(jester.__proto__);
console.log('jester.__proto__.__proto__:');
console.dir(jester.__proto__.__proto__);