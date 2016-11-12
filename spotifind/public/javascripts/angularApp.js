var app = angular.module('spotifind', []);


app.factory('posts', [function(){
  var o = {
  	posts: []
  };
  return o;
}]);

app.controller('MainCtrl', [
	'$scope',
	'posts',

	//$scope.latitude,
	//$scope.longitude,

	function($scope, posts){
		$scope.latitude = '0';
		$scope.longitude = '0';
		$scope.test = 'Hello World!';
		$scope.posts = posts.posts;
		$scope.location_array = [];
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
			 $scope.location_array.push([$scope.latitude, $scope.longitude]);
		};
	}




	]);