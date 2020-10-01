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

var maverick = new Marsupial('Maverick', true);
var slider = new Marsupial('Slider', false);

var isNightTime = true;

console.log('maverick.isNocturnal', maverick.isAwake(isNightTime)); // true
console.log('maverick.name', maverick.isAwake(isNightTime)); // true

// each object has its own isAwake function
console.log('maverick.isAwake === slider.isAwake', maverick.isAwake === slider.isAwake); // true