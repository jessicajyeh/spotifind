var app = angular.module('spotifind', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',

	function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('home', {
			url: '/home',
			templateUrl:'/home.html',
			controller: 'MainCtrl'


			//,
			/*
			resolve: {
				locationPromise: ['locations', function(locations){
					return locations.getAll();
				}]
			}*/

		}).state('locations', {
			url: '/locations/{id}',
			templateUrl: '/locations.html',
			controller: 'LocationsCtrl'
		}).state('playlist', {
			url: '/playlist',
			templateUrl: '/playlist.html',
			controller: 'MainCtrl'
		});

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


  o.saveLocation = function(location) {
  	return $http.post('/locations', location).success(function(data){
    	o.locations.push(data);
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
			locations.saveLocation({
					"latitude": $scope.latitude,
					"longitude": $scope.longitude,
					"playListID": $scope
			});
		};


	


		$scope.getSavedLocations = function(){
			locations.getAll();
		};
	}




	]);



app.controller('LocationsCtrl', [
	'$scope',
	'$stateParams',
	'locations',

	function($scope, $stateParams, locations){
		$scope.location = locations.locations[$stateParams.id];
	}

]);
