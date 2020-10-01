var primate = {
  stereoscopicVision: true
};

var ape = Object.create(primate);
ape.hasThumbs = true;
ape.hasTail = false;
ape.swing = function(){
  return "swinging";
};

var chimp = Object.create(ape);

console.log('chimp.hasTail:', chimp.hasTail); // false (from ape prototype)
console.log('chimp.stereoscopicVision:', chimp.stereoscopicVision);; // true (from primate prototype)