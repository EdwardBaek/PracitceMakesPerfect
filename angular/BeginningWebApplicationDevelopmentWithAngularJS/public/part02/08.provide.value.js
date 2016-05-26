angular.module('app', [])
//////////////////	provide value	//////////////////
.value('AppNm','Demo App')
.controller('ValueCtrl', 
	function($scope, AppNm){
		$scope.appNm = AppNm;
	}
)
//////////////////	provide factory	//////////////////
.factory('FactoryAppNm',[
	function(){
		return 'demo app from factory';
	}
])
.factory('FactoryUserResource', [
	function(){
		var userList = [];
		return{
			addUser : function(newUser){
				userList.push(newUser);
			},
			updateUser : function(idx, updateUser){
				userList[idx] = updateUser;
			},
			deleteUser : function(idx){
				userList[idx] = undefined;
			},
			selectUsers : function(){
				return userList;
			}
		}
	}
])
.controller('FactoryCtrl',
	function($scope, FactoryAppNm, FactoryUserResource){
		$scope.appNm = FactoryAppNm;

		// 해당 값의 link -> 해당 값도 singletone
		$scope.users = FactoryUserResource.selectUsers();
		$scope.addNewUser = function(newUser){
			FactoryUserResource.addUser(
				{
					name : newUser.name,
					email : newUser.email
				}
			);			
		};
		$scope.deleteUser = function(idx){
			console.log(idx);
			FactoryUserResource.deleteUser(idx);
		};
	}
)
.controller('FactoryCtrl2',
	function($scope, FactoryAppNm, FactoryUserResource){
		$scope.appNm = FactoryAppNm;

		// 해당 값의 link -> 해당 값도 singletone
		$scope.users = FactoryUserResource.selectUsers();
		$scope.addNewUser = function(newUser){
			FactoryUserResource.addUser(
				{
					name : newUser.name,
					email : newUser.email
				}
			);			
		};
		$scope.deleteUser = function(idx){
			console.log(idx);
			FactoryUserResource.deleteUser(idx);
		};
	}
)
//////////////////	provide service	//////////////////
.factory('CalcByF', [
	function(){
		return new Calculator();
	}
])
.service('CalcByS', Calculator)
.controller('ServiceCtrl', 
	function ServiceCtrl($scope, CalcByS, CalcByF){
		$scope.factory = CalcByF;
		$scope.service = CalcByS;

		$scope.val1 = CalcByF.add(10,3);
		console.log(CalcByF.lastValue);
		$scope.val2 = CalcByS.minus(20,10);
		console.log(CalcByS.lastValue);
	}
)
.controller('ServiceCtrl2',
	function ServiceCtrl($scope, CalcByS, CalcByF){
		$scope.factory = CalcByF;
		$scope.service = CalcByS;		
	}
)

function Calculator(){
	this.lastValue = 0;
	this.add = function(a,b){
		var returnValue = a + b;
		this.lastValue = returnValue;
		return returnValue;
	};
	this.minus = function(a,b){
		var returnValue = a-b;
		this.lastValue = returnValue;
		return returnValue;
	};
}





