myApp.controller("cartController",['$window','$scope','sessionService', '$http', '$location', "logoutService",function($window,$scope,sessionService, $http, $location, logoutService){
	var uid = sessionService.get("user");
	var jsonCart = [];
	jsonCart = JSON.parse(sessionService.get("cart"));
	var cart = [];
	angular.forEach(jsonCart,function(value, key){
		if(value.uid == uid){
			cart.push(value.pid);
		}
	});

	var dataCart = {carts: cart, method: "getProducts"};
	$http.post('scripts/postData.php', dataCart)
	.then(function(response){
		var responseData = response.data;
		var cartContentHolder = [];

		angular.forEach(responseData, function(value, key){
			var quantity = 0;
			var cartContent = {'id': value.pid, 'prod': value.prod_name, 'price': value.prod_price, 'quantity': 0};
			angular.forEach(response.data, function(value,key){
				if(value.prod_name == cartContent.prod){
					quantity++;
				}
			});
			cartContent.quantity = quantity;
			cartContentHolder.push(cartContent);
		});

		var uniqueId = [];
		angular.forEach(cartContentHolder, function(value,key){
			if(value.quantity > 1){
				var testid = value.id;
				var hit = false;
				angular.forEach(uniqueId, function(value,key){
					if(testid == value.uniq){
						hit = true;
					}
				});
				if(!hit){
					uniqueId.push({'uniq': value.id, 'hit': false});
				}
			}
		});

		var uniqueCart = [];
		$scope.totalP = 0;
		angular.forEach(cartContentHolder, function(value, key){
			if(value.quantity > 1){
				var counter = 0;
				angular.forEach(uniqueId, function(valueU, key){
					if(valueU.uniq == value.id && !valueU.hit){
						uniqueCart.push(value);
						uniqueId[counter].hit = true;
						counter++;
						$scope.totalP = $scope.totalP + (value.quantity * value.price);
					}
					counter++;
				});
			}

			else{
				uniqueCart.push(value);
				$scope.totalP = $scope.totalP + (value.quantity * value.price);
			}
		});

		$scope.cartDisplay = uniqueCart;
	});

	$scope.checkOut = function(){
		$location.url('/checkout');
	}

	$scope.removeItem = function(item){
		var index = $scope.cartDisplay.indexOf(item);
		var minus = $scope.cartDisplay[index].quantity * $scope.cartDisplay[index].price;
		$scope.cartDisplay.splice(index,1);
		$scope.totalP = $scope.totalP - minus;
		var storedCart = JSON.parse(sessionService.get("cart"));
		var newCart = [];
		angular.forEach(storedCart, function(value,key){
			if(uid != value.uid || value.pid != item.id){
				newCart.push(value);
			}
		});
		sessionService.destroy("cart");
		sessionService.set("cart", JSON.stringify(newCart));
	};

	$scope.removeAll = function(){
		var storedCart = JSON.parse(sessionService.get("cart"));
		var newCart = [];
		angular.forEach(storedCart, function(value, key){
			if(uid != value.uid){
				newCart.push(value);
			}
		});
		sessionService.destroy("cart");
		sessionService.set("cart", JSON.stringify(newCart));
		$scope.cartDisplay = {};
		$scope.totalP = 0;
	}

	$scope.payment = function(){
		angular.forEach($scope.cartDisplay, function(value,key){
			var submitData = {pid: value.id, uid: uid, prod: value.prod, quantity: value.quantity};
			$http.post('scripts/processOrders.php', submitData);
		});
		
		
	};

	$scope.logout = function(){
		logoutService.log();
		$location.url('/login')
	}

	
}]);