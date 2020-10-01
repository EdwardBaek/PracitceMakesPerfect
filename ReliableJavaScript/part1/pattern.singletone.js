
var MyApp = MyApp || {};

MayApp.WildlifePreserveSimulator = (function() {

  var animals = [];

  return {
    addAnimal: function(animalMaker,species, sex) {
      animals.push(animalMaker.make(species,sex));
    },
    GetAnimalCount: function() {
      return animals.length;
    }
  };
})(); // <- Immedate execution!

// Usages
MyApp.WildlifePreserveSimulator.addAnimal(realAnimalMaker, gorilla, female)