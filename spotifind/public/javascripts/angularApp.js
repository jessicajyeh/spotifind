var app = angular.module('spotifind', []);

app.controller('MainCtrl', [
	'$scope',

	//$scope.latitude,
	//$scope.longitude,

	function($scope){
		$scope.latitude = '0';
		$scope.longitude = '0';
		$scope.test = 'Hello World!';
		//var x = document.getElementById("demo");
		$scope.getLocation = function(){
			if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition($scope.showPosition);
			    } else {
			        //x.innerHTML = "Geolocation is not supported by this browser.";
			}
		};

		$scope.showPosition = function(position){
			$scope.latitude = position.coords.latitude;
			$scope.longitude = position.coords.longitude;
		};
	}



	]);