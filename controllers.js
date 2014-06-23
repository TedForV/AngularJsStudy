var app = angular.module("exampleApp",[]);

app.controller("topLevelCtrl", function($scope){
	$scope.dataValue = "Hello, Adam";

	$scope.reverseText = function(){
		$scope.dataValue = $scope.dataValue.split("").reverse().join("");
	}

	$scope.changeText = function(){
		var result=[];
		angular.forEach($scope.dataValue.split(""),function(c,index){
			result.push(index % 2 ==1
				? c.toString().toUpperCase():c.toString().toLowerCase());
		});
		$scope.dataValue= result.join("");
	};
});

app.controller('firstChildCtrl', function($scope){
	$scope.changeText = function(){
		$scope.dataValue = $scope.dataValue.toUpperCase();
	};

});

app.controller('secondChildCtrl', function($scope){
	$scope.changeText = function(){
		$scope.dataValue = $scope.dataValue.toLowerCase();
	};

	$scope.shiftFour = function(){
		var result = [];
		angular.forEach($scope.dataValue.split(""),function(c,index){
			result.push(index < 4 ? c.toUpperCase() : c);
		});
		$scope.dataValue = result.join("");
	}	
});