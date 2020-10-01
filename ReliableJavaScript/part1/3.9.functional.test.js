var marsupial = function(name, nocturnal) {
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

var kangaroo = function(name) {
  var baseMarsupial = marsupial(name, false);

  baseMarsupial.hop = function(){
    return baseMarsupial.getName() + ' just hopped!';
  };

  return baseMarsupial;
}

var jester = kangaroo('Jester');
console.log(jester.getName());  // 'Jester'
console.log(jester.getIsNocturnal()); // false
console.log(jester.hop());  // 'Jester just hopped!'

//
console.log('---');
console.log('marsupial');
console.dir(marsupial);
console.log('kangaroo');
console.dir(kangaroo);
console.log('kangaroo.__proto__');
console.dir(kangaroo.__proto__);
console.log('kangaroo.prototype');
console.dir(kangaroo.prototype);

console.log('---');
console.log('jester');
console.dir(jester);
console.log('jester.__proto__');
console.dir(jester.__proto__);
console.dir('jester.prototype');
console.dir(jester.prototype);
