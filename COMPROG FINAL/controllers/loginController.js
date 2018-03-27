myApp.controller('loginController',['$rootScope', '$scope', '$http', 'sessionService', '$location', function($rootScope,$scope,$http,sessionService,$location){
	$scope.user = {};
	$scope.user.method = "login";
	
	$scope.loginSubmit = function(){
		$http.post('scripts/postData.php', $scope.user)
		.then(function(response){
			var id = response.data;
			if(id > 0){
				$rootScope.logged = true;
				sessionService.set('user',id);
				sessionService.set('status',true);
				$rootScope.cid = id;
				$location.url('/home');
			}
			else{
				sessionService.destroy('user');
				sessionService.destroy('status');
				alert('Login Failed');
			}
		});
	}
}]);