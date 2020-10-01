var AnimalKingdom = AnimalKingdom || {};
AnimalKingdom.marsupial = function(name, nocturnal) {
  var instanceName = name;
  var instanceIsNocturnal = nocturnal;

  return {
    getName: function(){
      return instanceName;
    },
    getIsNocturnal: function(){
      return instanceIsNocturnal;
    }
  }
}

AnimalKingdom.kangaroo = function(name) {
  var baseMarsupial = AnimalKingdom.marsupial(name, false);

  baseMarsupial.hop = function(){
    return baseMarsupial.getName() + ' just hopped!';
  };

  return baseMarsupial;
}

var jester = AnimalKingdom.kangaroo('Jester');
console.log(jester.getName());  // 'Jester'
console.log(jester.getIsNocturnal()); // false
console.log(jester.hop());  // 'Jester just hopped!'

//
console.log('---');
console.log('AnimalKingdom');
console.dir(AnimalKingdom);
console.log('AnimalKingdom.marsupial');
console.dir(AnimalKingdom.marsupial);
console.log('AnimalKingdom.kangaroo');
console.dir(AnimalKingdom.kangaroo);

console.log('---');
console.log('jester');
console.dir(jester);
console.dir(jester.prototype);
console.log('jester.__proto__');
console.dir(jester.__proto__);
