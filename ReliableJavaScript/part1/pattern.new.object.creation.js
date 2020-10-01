function Marsupial(name, nocturnal) {
  this.name = name;
  this.isNocturnal = nocturnal;
}

var maverick = new Marsupial('Maverick', true);
var slider = new Marsupial('Slider', false);

console.log('maverick.isNocturnal', maverick.isNocturnal); // true
console.log('maverick.name', maverick.name); // "Maverick"

console.log('slider.isNocturnal', slider.isNocturnal); // true
console.log('slider.name', slider.name); // "Slider"