// $('ul.nav li.dropdown').hover(function() {
//   $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
// }, function() {
//   $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
// });

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl: 'views/homepage.html',
		controller: 'homeController'
	})
	.when('/shop',{
		templateUrl: 'views/shop.html',
		controller: 'shopController'
	})
	.when('/register',{
		templateUrl: 'views/register.html',
		controller: 'registerController'
	})
	.when('/login',{
		templateUrl: 'views/login.html',
		controller: 'loginController'
	})
	.when('/account',{
		templateUrl: 'views/account.html',
		controller:'accountController'
	})
	.when('/cart',{
		templateUrl: 'views/cart.html',
		controller: 'cartController'
	})
	.when('/cakeshop',{
		templateUrl:'views/cakeshop.html',
		controller: 'shopController'
	})
	.when('/cupcakeshop',{
		templateUrl:'views/cupcakeshop.html',
		controller: 'shopController'
	})
	.when('/pastryshop',{
		templateUrl:'views/pastryshop.html',
		controller: 'shopController'
	})
	.when('/checkout',{
		templateUrl:'views/checkout.html',
		controller:'cartController'
	})
	.otherwise({
		redirectTo: '/home'
	});
}]);

myApp.factory('sessionService', ['$http', function($http){
	return{
		set:function(key,value){
			if(!angular.equals(key, "cart")){
				return sessionStorage.setItem(key, value);	
			}
			else{
				var method = {data: value,method: "sessionCart"};
				$http.post('scripts/postData.php', method);
				return sessionStorage.setItem(key, value);
			}
		},
		get:function(key){
			if(angular.equals(key, "loadUser")){
				$http.post('scripts/getSession.php', "user")
				.then(function(response){
					if(response.data > 0){
						sessionStorage.setItem("user", response.data);
						sessionStorage.setItem("status", true);
					}
				});
			}
			return sessionStorage.getItem(key);
		},
		destroy:function(key){
			if(angular.equals(key,"logout")){
				var destroy = {process: "logout"};
				$http.post('scripts/destroySession.php', destroy);
				sessionStorage.removeItem("user");
				return sessionStorage.removeItem("status");	
			}
			else{
				var destroy = {process: "cartRemove"};
				$http.post('scripts/destroySession.php',destroy);
				return sessionStorage.removeItem("cart");
			}
		}
	};
}]);

myApp.factory('logoutService',['$rootScope','sessionService', '$location', function($rootScope, sessionService, $location){
	return{
		log:function(){
			sessionService.destroy('logout');
			$rootScope.logged = false;
			$rootScope.cid = 0;
			$location.url('/login');
		}
	};
}]);


