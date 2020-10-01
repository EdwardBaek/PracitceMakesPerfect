
// A global object that serves as a namespace, collecting
// all the ojbects (modules) that are to be available
//  throughout the application.
// 해당 애플리케이션에만 사용할 수 있는 모든 객체(모듈)를 담아 넣은
// 전역 객체를 선언하여 이름공간척럼 활용한다.

var MyApp = MyApp || {};

// A module under the application's namespace.
// The function depends on another function, animalmaker, which can
// be injected.

MayApp.wildlifePreserveSimulator = function(animalMaker) {
  // Private varialbes
  // 프라이빗 변수
  var animals = [];

  // Ruturn the API
  // API를 반환
  return {
    addAnimal: function(species, sex) {
      animals.push(animalMaker.make(species,sex));
    },
    GetAnimalCount: function() {
      return animals.length;
    }
  };
};

// Usage
var preserve = MyApp.wildlifePreserveSimulator(realAnimalMaker);
preserve.addanimal(gorilla, female);