myApp.controller("shopController",["$scope","sessionService","logoutService","$location", function($scope, sessionService, logoutService, $location){
	var uid = sessionService.get("user");
	$scope.logged= sessionService.get("status");
	$scope.addCart = function(pid){
		console.log(pid);
		var cartItems = [];
		var jsonCart = JSON.parse(sessionService.get("cart"));
		if(jsonCart != null){
			cartItems = jsonCart;
		}
		cartItems.push({'pid': pid, 'uid': uid});
		cartItems = JSON.stringify(cartItems);
		sessionService.set("cart", cartItems);
	}

	$scope.logout = function(){
		logoutService.log();
		$location.url('/login');
	}

}]);