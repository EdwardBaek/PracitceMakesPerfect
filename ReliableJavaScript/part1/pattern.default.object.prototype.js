var chimp = {
  hasThumbs: true,
  swing: function() {
    return 'swinging through the tree tops';
  }
};

// Usage
console.log('No toString function:', chimp.toString());

var chimp = {
  hasThumbs: true,
  swing: function() {
    return 'swinging through the tree tops';
  },
  toString: function(){
    return 'I am the chimpanzee';
  }
};

console.log('Has toString function:', chimp.toString());