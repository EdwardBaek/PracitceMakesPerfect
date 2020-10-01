var ape = {
  hasThumbs: true,
  hasTail: false,
  swing: function() {
    return 'swinging';
  }
};

var chimp = Object.create(ape);

var bonobo = Object.create(ape);
bonobo.habitat = 'Central Africa';

console.log('bonobo.habitat:', bonobo.habitat);  // 'Central Africa' (from bonobo)
console.log('bonobo.hasTail:', bonobo.hasTail);  // false (from ape prototype)

console.log('chimp.swing():', chimp.swing()); // 'swinging' (from ape prototype)