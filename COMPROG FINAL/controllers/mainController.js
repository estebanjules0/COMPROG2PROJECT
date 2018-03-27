myApp.controller('mainController', ['$rootScope','$scope','$location', 'sessionService' ,function($rootScope,$scope, $location,sessionService){
	$scope.initial = function(){
		if(sessionService.get('status')){
			$rootScope.logged = true;
		}
		else{
			$rootScope.logged = false;
		}
	};
	$scope.$watch(function(){
		return $location.path();
	}, function(value){
		$scope.cssFile = value;
		console.log($scope.cssFile);
	});
}]);