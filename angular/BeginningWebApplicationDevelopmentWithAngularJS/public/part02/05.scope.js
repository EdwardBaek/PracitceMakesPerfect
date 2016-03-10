angular.module( 'app', [])

.controller( 'parentCtrl',
	function parentCtrl($scope){
		$scope.parent = {name:"parent Kim"};
		$scope.changeParentName = function(){
			$scope.parent.name = "parent Kim";
		};
	}	
)
.controller( 'childCtrl',
	function childCtrl($scope){
		$scope.child = {name:"child Ko"};
		$scope.changeParentName = function(){
			$scope.parent.name = "another Kim";
		};
	}
)


/*
parentCtrl 하위에 childCtrl을 선언 할 경우, 스코프에서 상속이 이루어진다. 이는 프로토타입을 기반으로 상속이 되기 때문에, 가장 하위의 childCtrl.$scope에서 없는 parent값은 상위 프로토 타입 객체의 속성을 탐색한다. 이 과정을 프로토타입 체인(prototype chain)이라 한다.
*/

