app.controller('LoginController', ['$scope', '$location', '$cookies', 'authentication', '$mdToast', '$window',
	function ($scope, $location, $cookies, authentication, $mdToast, $window) {

		$scope.username = '';
		$scope.password = '';

		$scope.login = function() {

			authentication.post({},{username:$scope.username, password:$scope.password}, function(response) {	
				$scope.$emit('authentication', {result:response.success, token:response.token});				
			});
		};
    
}]);


