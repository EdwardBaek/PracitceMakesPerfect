var todoList = 
[
	{
		done: true,
		title: "AngularJs Coding"
	},
	{
		done: false,
		title: "AngularJs Coding1"
	},
	{
		done: false,
		title: "AngularJs Coding2"
	}
];

angular.module('todoApp', [])
.controller( 'todoCtrl', 
function todoCtrl( $scope ){
	$scope.todoList = todoList;
	$scope.appName = "AngularJs TODO APP";	

	$scope.addNewTodo = function( newTitle ){
		todoList.push( { done: false, title: newTitle } );
		$scope.newTitle = '';
	};
	$scope.archive = function(){
		for( var i = $scope.todoList.length - 1; 0 <= i; --i ){
			if( $scope.todoList[i].done){
				$scope.todoList.splice( i, 1 );
			}
		}
	};
	$scope.remain = function(){
		var remainCount = 0;
		angular.forEach( $scope.todoList, function( value, key ){
			if( value.done === false ){
				++remainCount;
			}
		});
		return remainCount;
	};
}
);

/*
The Zen of Angular

선언적 코드가 좋다.
1.DOM 조작 분리
2.테스팅에 편한 구조적 코드  
3.클라이언트/서버 분리된 작업
4.가이드를 주는 프레임워크 ( UI부터 비즈니스 로직 개발까지 )

고통으로부터의 해방
1.콜백함수와 공통 함수로부터의 자유
2.DOM 조작으로부터의 자유
3.UI의 데이터 조작으로부터의 해방
4.구동을 위한 초기화 코드로쿠터의 해방

-> 각 부분에서 구체적인 예를 들어서 설명을 할 수 있게 하자.


https://docs.angularjs.org/guide/introduction

The Zen of Angular

AngularJs는 UI를 만들고 소프트웨어 컴포넌트들을 서로 엮는 것에는 선언적 코드가 명령적 코드보다 더 좋다는 믿음에서 만들어졌다. 물론 비즈니스 로직을 표현하는 데는 명령적 코드가 더 좋다.

-애플리케이션 로직으로부터 DOM조작을 분리하는 것은 매우 좋은 생각이다. 이는 코드의 테스트 기능성을 매우 향상시킨다.
-애플리케이션 테스팅이 애플리케이션 작성만큼 중요하다고 여기는 것은 매우 좋은 생각이다. 테스팅의 어려움의 정도는 코드가 어떻게 구조적으로 만들어졌는가에 직접적으로 영향을 받는다.
-클라이언트 쪽의 애플리케이션과 서버 쪽을 분리하는 것은 휼륭한 생각이다. 이는 동시에 양쪽에서 개발 할 수 있게 하며 양쪽 모두 재사용할 수 있게 한다. 
-프레임워크가 개발자로 하여금 애플리케이션 개발에 있어서 처음부터 끝까지 전체적으로 가이드 하는 것은 매우 유용하다. 처음부터 끝이라 함은 UI를 디자인하는 것부터 비즈니스 로직 개발을 거쳐 테스트까지를 말한다.
-애플리케이션의 공통적인 일을 신경쓰지 않게 하고 어려운 일을 가능케 하는 것은 항상 좋은 것이다.

1.DOM 조작 분리
2.테스팅에 편한 구조적 코드  
3.클라이언트/서버 분리된 작업
4.가이드를 주는 프레임워크 ( UI부터 비즈니스 로직 개발까지)



AngularJS는 다음과 같은 고통으로쿠터 여러분을 해방시켜줄 것이다.
-AngularJS는 콜백 함수 등록으로부터 해방시킨다. 콜백 함수 등록은 여러분의 코드를 복잡하게 하고 숲의 전체를 보는 것을 어렵게 한다. 콜백 함수와 같은 공통적으로 쓸데없이 계속 사용되는 코드는 제거하는 것이 좋다. 이는 대단히 많은 양의 자바스크립트 코드를 줄임으로써 여러분의 애플리케이션이 무엇인지 보기 쉽게 해준다.
-AngularJS는 프로그래밍 방식으로 HTML DOM 조작으로부터 해방시킨다. HTML DOM 조작은 AJAX 애플리케이션의 중추적인 역할을 한다. 하지만 이는 다루기 어렵고 에러를 유발하기 쉽다. 여러분의 애플리케이션 상태가 변할 때 선언적으로 UI가 어떻게 바뀌어야 한다고 기술할 수 있다면 여러분은 낮은 단계의 DOM 조작으로부터 해방될 수 있다. 여러분이 진정 원하지 않으면 대부분 AngularJS 기반 애플리케이션은 프로그래밍 방식으로 DOM을 조작할 필요가 없다.
-AngularJS는 UI로 오고가는 데이터 조작으로부터 해방시킨다. CRUD 행위는 대부분 AJAX를 이용하는 애플리케이션이 하는 일이다. 서버로부터 온 데이터를 HTML 폼의 내부 객체에서 사용되게 조작하여 사용자로 하여금 그 폼을 변경하게 하고 그 폼의 유효성 검사를 하고 유효성 에러를 보여주고 다시 내부 모델로 객체화하고 그 후 서버로 다시 데이터를 보내는 일은 매번 똑같은 코드를 만들게 한다. AngularJS는 대부분의 이러한 똑같은 코드를 제거해 모든 상세 구현보다는 애플리케션의 저네 흐름을 보여주게 한다.
-AngularJS는 단지 구동하기 위한 수많은 초기화 코드로부터 해방시킨다. 일반적으로 기본적인 "Hello World" AJAX 웹 애플리케이션이 동작하려면 많은 초기화 코드를 작성해야 한다. AngularJS를 이용하면 서비스를 이용해 쉽게 여러분의 애플리케이션을 구동할 수 있다. 또 이런 서비스들은 달콤한 의존관계 스타일로 여러분의 애플리케이션에 알아서 주입된다. 이는 애플리케이션의 기능을 빠르게 개발할 수 있게 돕는다. 또한 보너스로 자동화된 테스트에서 초기화 과정 전체를 제어할 수도 있다.

1.콜백함수와 공통 함수로부터의 자유
2.DOM 조작으로부터의 자유
3.UI의 데이터 조작으로부터의 해방
4.구동을 위한 초기화 코드로쿠터의 해방





The Zen of Angular
Angular is built around the belief that declarative code is better than imperative when it comes to building UIs and wiring software components together, while imperative code is excellent for expressing business logic.

It is a very good idea to decouple DOM manipulation from app logic. This dramatically improves the testability of the code.
It is a really, really good idea to regard app testing as equal in importance to app writing. Testing difficulty is dramatically affected by the way the code is structured.
It is an excellent idea to decouple the client side of an app from the server side. This allows development work to progress in parallel, and allows for reuse of both sides.
It is very helpful indeed if the framework guides developers through the entire journey of building an app: From designing the UI, through writing the business logic, to testing.
It is always good to make common tasks trivial and difficult tasks possible.
Angular frees you from the following pains:

Registering callbacks: Registering callbacks clutters your code, making it hard to see the forest for the trees. Removing common boilerplate code such as callbacks is a good thing. It vastly reduces the amount of JavaScript coding you have to do, and it makes it easier to see what your application does.
Manipulating HTML DOM programmatically: Manipulating HTML DOM is a cornerstone of AJAX applications, but it's cumbersome and error-prone. By declaratively describing how the UI should change as your application state changes, you are freed from low-level DOM manipulation tasks. Most applications written with Angular never have to programmatically manipulate the DOM, although you can if you want to.
Marshaling data to and from the UI: CRUD operations make up the majority of AJAX applications' tasks. The flow of marshaling data from the server to an internal object to an HTML form, allowing users to modify the form, validating the form, displaying validation errors, returning to an internal model, and then back to the server, creates a lot of boilerplate code. Angular eliminates almost all of this boilerplate, leaving code that describes the overall flow of the application rather than all of the implementation details.
Writing tons of initialization code just to get started: Typically you need to write a lot of plumbing just to get a basic "Hello World" AJAX app working. With Angular you can bootstrap your app easily using services, which are auto-injected into your application in a Guice-like dependency-injection style. This allows you to get started developing features quickly. As a bonus, you get full control over the initialization process in automated tests.
*/