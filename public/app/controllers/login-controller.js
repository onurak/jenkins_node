app.controller('LoginController', ['$scope', '$location', '$cookies', 'authentication', '$mdToast', '$window',
	function ($scope, $location, $cookies, authentication, $mdToast, $window) {

		//delete $window.sessionStorage.token;
		//$scope.$emit('authentication', false);

		console.log('LoginController');
		$scope.username = '';
		$scope.password = '';

		$scope.login = function() {

			authentication.post({},{username:$scope.username, password:$scope.password}, function(response) {	
				console.log('login');
				console.log(response);			
				$scope.$emit('authentication', {result:response.success, token:response.token});				
			});
		};
    
}]);


