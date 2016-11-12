var app = angular.module('spotifind', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',

	function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl:'/home.html',
			controller: 'MainCtrl',

			/*resolve: {
				locationPromise: ['locations', function(locations){
					return locations.getAll();
				}]
			}*/
		});

		/*.state('locations', {
			url: '/locations/{id}',
			templateUrl: '/locations.html',
			controller: 'LocationsCtrl'
		});*/

		$urlRouterProvider.otherwise('home');

}]);


app.factory('locations', ['$http', function($http){
  var o = {
  	locations: []

  };

  o.getAll = function() {
  	return $http.get('/locations').success(function(data){
  		angular.copy(data, o.locations);
  	});

  };

  return o;


}]);

app.controller('MainCtrl', [
	'$scope',
	'locations',

	//$scope.latitude,
	//$scope.longitude,

	function($scope, locations){
		$scope.latitude = '0';
		$scope.longitude = '0';
		$scope.test = 'Hello World!';
		$scope.locations = locations.locations;
		//var x = document.getElementById("demo");
		$scope.getLocation = function(){
			if (navigator.geolocation) {
		    	navigator.geolocation.getCurrentPosition($scope.showPosition);
			}
			else {
			    //x.innerHTML = "Geolocation is not supported by this browser.";
			}
		};

		$scope.showPosition = function(position){
			$scope.latitude = position.coords.latitude;
			$scope.longitude = position.coords.longitude;
		};

		$scope.saveLocation = function(){
			 $scope.locations.push([$scope.latitude, $scope.longitude]);
		};
	}




	]);

/*

app.controller('LocationsCtrl', [
	'$scope',
	'$stateParams',
	'locations'

	function($scope, $stateParams, locations){
		$scope.location = locations.locations[$stateParams.id];

}]);

*/