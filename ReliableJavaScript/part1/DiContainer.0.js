DiContainer = function() {
  // 반드시 생성자로 객체를 생성하게 한다.
  if (!(this instanceof DiContainer)) {
    return new DiContainer();
  }
};

//인자를 확인하는 테스트
DiContainer.prototype.register = function(name, dependencies, func) {
};