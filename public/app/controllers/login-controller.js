app.controller('LoginController', ['$scope', '$location', '$cookies', 'authentication', '$mdToast', '$window',
	function ($scope, $location, $cookies, authentication, $mdToast, $window) {


		console.log('LoginController');
		$scope.username = '';
		$scope.password = '';

		$scope.login = function() {

			authentication.post({},{username:$scope.username, password:$scope.password}, function(response) {
				
				if (response.success) {			
					$window.sessionStorage.setItem('token', response.token);
					window.location = '/servers';
				} else {
					delete $window.sessionStorage.token;
					$scope.$emit('authentication', false);
					$mdToast.show($mdToast.simple().textContent('Unable to login: ' + response.message).position('top right').hideDelay(3000));
				}
			});
		};
    
}]);


