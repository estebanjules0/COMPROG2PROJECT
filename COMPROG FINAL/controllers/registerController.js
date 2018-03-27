myApp.controller('registerController',['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.user = {};
	$scope.user.method = "register";
	$scope.regSubmit = function(){
		$http.post('scripts/postData.php', $scope.user)
		.then(function(response){
			var query = response.data;
			if(query == "success"){
				$location.url('/login');
			}
			if(query == "ue"){
				alert("Username and Email already taken");
			}
			if(query == "username"){
				alert("Username is already taken");
			}
			if(query == "email"){
				alert("Email is already taken");
			}
			if(query == "invalid"){
				alert("A field has an invalid input");
			}
		});
	};
}]);