myApp.controller('accountController',['$scope','$http', 'sessionService', '$rootScope', 'logoutService',function($scope, $http,sessionService, $rootScope, logoutService){

	var initiateData = function(){
		$scope.cid = {cid: sessionService.get('user'), method: 'getCurrentUser'};
		$http.post('scripts/postData.php', $scope.cid)
			.then(function(response){
				$scope.userData = response.data;
				console.log($scope.userData);
			});
		$scope.cCN = false;
		$scope.cEA = false;
		$scope.cPW = false;
		$scope.details = {};
	}
	
	initiateData();
	
	$scope.updateDetails = function(){
		console.log("working");
		$scope.details.method = "updateDetails";
		$scope.details.cid = $scope.cid.cid;
		$http.post('scripts/postData.php', $scope.details)
		.then(function(){
			initiateData();
		});
	}

	$scope.logout = function(){
		logoutService.log();
	}

}]);