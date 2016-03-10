/*
바인딩 처리시
$apply
$digest
$watch
$watchCollection

사용자 정의 이벤트처리 시
$broadcast
$emit
$on

표현식을 $scope 객체의 컨텍스트에서 계산 할 때
$eval
$evalAsync

$scope의 생성과 파괴 처리
$new
$destroy
*/
angular.module( 'app', [])
.controller( 'mainCtrl',
	function mainCtrl($scope){
		$scope.broadcast = function(noticeMsg){
			console.log(noticeMsg);
			$scope.$broadcast("chat:noticeMsg" , noticeMsg);
			$scope.noticeMsg = "";			
		};
	}		
)
.controller('chatMsgListCtrl',
	function chatMsgListCtrl($rootScope, $scope){
		$scope.msgList = [];
		$rootScope.$on("chat:newMsg", function(e,newMsg){
			console.log(newMsg);
			$scope.msgList.push(newMsg);
		});
		$scope.$on("chat:noticeMsg", function(e,noticeMsg){
			console.log(noticeMsg);
			$scope.msgList.push("[공지]" + noticeMsg);
		});
	}
)
.controller( 'chatMsgInputCtrl',
	function chatMsgInputCtrl($scope){
		$scope.submit = function(newMsg){
			$scope.$emit("chat:newMsg",newMsg);
			$scope.newMsg = "";
		};
	}
)
;
