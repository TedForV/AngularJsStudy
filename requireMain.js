require.config({
	baseUrl:'',
	paths:{
		'jquery':'jquery-1.9.1',
		'angular':'angular'
	},
	shim:{
		angular:{
			deps:['jquery'],
			exports:'angular'
		}
	}
});
require(['angular','jquery'],function(angular,jqurey){
	angular.module('exampleApp', [])
			.controller('defaultCtrl',function($scope){
			 	$scope.TestTitle = "Test Title";
	});


	angular.bootstrap(document,['exampleApp']);


	
	// alert("test");
});