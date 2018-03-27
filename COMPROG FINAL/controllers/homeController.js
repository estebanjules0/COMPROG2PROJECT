myApp.controller('homeController',['$scope','$rootScope','sessionService','logoutService', function($scope,$rootScope, sessionService, logoutService){
	sessionService.get("loadUser");
	$rootScope.cid = sessionService.get('user');
	$rootScope.logged = sessionService.get('status');
	$scope.logout = function(){
		logoutService.log();
	}
}]);