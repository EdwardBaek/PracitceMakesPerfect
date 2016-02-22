/*
일반적으로 부트스트랩이라 하면 그 자체의 동작에 의해서 어떤 소정의 상태로 이행하도록 설정된 방법이라 한다. 컴퓨터 기술 분야에서는 컴퓨터가 켜지면서서 기본적인 소프트웨어를 컴퓨터상의 메모리에 올리는 프로세스라고 여긴다. AngularJS또한 단순한 HTML 페이지를 AngularJS 웹 애플리케이션으로 동작하게 하기 위한 프로세스가 존재한다. 이를 AngualrJS 부트스트랩이라고 할 수 있다. AngularJS 부트스트랩은 크게 ng-app 지시자를 이용한 부트스트랩과 angular.bootstrap 메서드를 이용한 부트스트랩으로 나눌 수 있다.
*/ 
/*

ng-app 지시자를 이용한 부트스트랩은 한페이지에서 하나만 적용될 수 있다. 
angular.bootstrap 메서드를 이용한 부트스트랩은 여러곳에 사용 될 수 있다. 

IE 지원시 id="ng-app" or data-ng-app 사용.
XML 네임스페이스 사용시 <html xmns:ng="http://ngularjs.org" ng-app>


부트스트랩의 과정
https://docs.angularjs.org/guide/bootstrap

1. directive 와 연결된 module을 load
2. application injector를 생성
3. ng-app를 최상위자로 한 directive를 compile


*/


/*
//cotroller way 1
angular.module( 'myApp', [])
.controller( 'MyController', 
	['$scope', 
		function( $scope ){
			$scope.greetMe = 'World';
		}
	]
);
*/

//cotroller way 2
angular.module( 'myApp', [])
.controller( 'MyController', 
	function( $scope ){
		$scope.greetMe = 'World with MyController in myApp';
	}	
);

angular.element(document).ready( function(){
	angular.bootstrap( document.getElementById('app1') );
	angular.bootstrap( document.getElementById('app2') );
	angular.bootstrap( document.getElementById('myApp'), ['myApp']);
});