/*
AngularJS에서의 서비스란?
 프로그램 관점에서 보자면 서비스란 단순히 $provide를 이용해 만들어지는 것이다. 하지만 다른 관점에서 보면 서비스는 다양한 역할을 하게 된다. 다음은 서비스의 다양한 역할을 설명하고 있다. 행당 역학들은 스캇 앨런(K. Scott Allen)이 작성한 AngularJS 추상화: 서비스들이라는 글을 참고하였다.
http://odetocode.com/blogs/scott/archive/2013/06/05/angularjs-abstractions-services.aspx

1.애플리케이션 공통 로직으로서의 서비스.
	컨트롤러. 지시자. 다른 서비스는 모두 특정 서비스의 하나 이상의 의존관계를 가질 수 있거나 가지지 않을 수 있다. 이 말은 즉, 서비스는 애플리케이션의 각 다른 부분에서 공통으로 사용하는 코드를 담기에 좋은 곳이란 말이다. 가령 여러 컨트롤에서 특정 계산 알고리즘을 필요로 한다면 해당 알고리즘을 구현한 코드가 있는 서비스를 만들어 해당 알고리즘을 필요로 하는 컨트롤러가 이 서비스를 사용하면 되는 것이다.
2. 싱글톤(Singleton)으로서의 서비스
	AngularJS는 서비스를 싱글톤으로 관리한다. 즉, 애클리케이션에서 서비스의 인스턴스를 오직 하나만 가지고 있게 한다는 것이다. 이는 서비스가 애플리케이션이 살아있는 동안에 유지해야 할 데이터를 보관하는 장소로 적당하다는 의미다. 가령 화면이 변경되어 여러 컨트롤러와 모델들이 호출되고 다시 싸라지는 동안 유지해야 할 데이터가 있으면 서비스를 이용해 유지할 수 있다는 의미다.	
3.커뮤니케이션 허브(hub)로서의 서비스
	AngularJs는 관심사의 분리(separation of concerns)를 할 수 있고 다양한 컴포넌트 사이에 서로의 존재 여부를 모르게 하기 위한 프레임워크 기능을 제공한다. 서비스가 이러한 기능이라고 볼 수 있는데 이 서비스는 컨트롤러, 지시자, 필터, 그리고 다른 서비스에 주입되므로 다른 컴포넌트간에 느슨하게 연결(loosely coupled)하며 서로 커뮤니케이션을 하게 하는 매개체 역할을 하게 한다. 
4.의존성 주입 대상(Injectable Dependencies)으로서의 서비스
	서비스를 가장 많이 사용하는 이유 중 하나는 서비스가 컨트롤러. 지시자. 필터 그리고 다른 서비스와 같은 다른 컴포넌트에 주입되기 때문이다. 이는 각 컴포넌트 사이에 느슨한 연결을 하게 해주며 단위 테스트시에 얼마든 주입되는 컴포넌트를 대체 시킬 수 있게 한다. AngularJS는 $http, $log, $window 등 다양한 서비스를 제공하고 이러한 서비스를 다른 컴포넌트에게 주입할 수 있는 대상이 된다.
*/
/*

자바스크립트 객체들 사이의 의존관계 - AngularJS 개발자 문서
1.new 키워드를 통한 의존관계 성립
2.전역변수 참조를 통한 의존관계 성립
3.인자를 통하여 참조를 전달받아 의존관계 성립

1.ex
function demoCtrl(){
	var bookmark = new BookmarkResource( new Ajax(), new JsonParser());
}
문제점 : BookmarkResource를 사용하기 위해 Ajax와 JsonParser가 인자가 필요하다는 것까지 알고 있어야한다. 
1.내용의 변경시(예 Json방식->XML으로 변경) BookmarkResource를 사용하는 컨트롤러 소스를 다 수정해야 할 것이다.
2.테스트가 불편하다.
->
var factory = {
	getBookmarkResource : function(){ 
		return new BookmarkResource(factory.getAjax(), factory.getJsonParser(); 
	},
	getAjax : function(){ return new Ajax(); },
	getJsonParser : function(){ return new JsonParser(); }
}

function demoCtrl(){
	var bookmark = factory.getBookmarkResource();
}

//
funciton demoCtrl(BookmarkResource){
	var bookmark = BookmarkResource.get();
}

이점: 
1.데모 컨트롤러는 BookmarkResource가 어떻게 생성되는지 몰라도 된다. 나중에 수정시(예 Ajax/ JSON형식 -> XML형식) 모든 컨트롤러 함수를 수정할 필요없이 팩토리 객체만 수정하면 된다. 
2.

*/



angular.module('app',[])
.factory( 'hello', [
	function(){
		var helloText = "님 안녕하세요.";
		return{
			say : function(name){
				return name + helloText;
			}
		}
	}
])
.controller('mainCtrl',
	function($scope, hello){
		$scope.hello = hello.say("철수");
	}
)



