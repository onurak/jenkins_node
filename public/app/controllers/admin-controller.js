app.controller('AdminController', ['$scope', '$location', '$q', '$window', '$location', '$injector', '$cookies', '$state', '$stateParams', 
	function ($scope, $location, $q, $window, $location, $injector, $cookies, $state,   $stateParams) {

    	$scope.isAuthenticated = false;
        var token = $cookies.getObject('token');
    	if (token) {
            $scope.isAuthenticated = true;
        }

    	console.log('AdminController');


        $scope.$on('authentication', function (event, args) {
            $scope.isAuthenticated = args.result;
            console.log('authentication received');
            console.log($scope.isAuthenticated);

            if ($scope.isAuthenticated) {         
                $cookies.putObject('token', args.token);
                console.log('sign in succeessfull: ' + args.token);
                $state.go('admin.servers');
                //window.location = '/servers';
            } else {
                $mdToast.show($mdToast.simple().textContent('Unable to login: ' + response.message).position('top right').hideDelay(3000));
                $cookies.removeObject('token');
                console.log('sign in failed');
                $state.go('admin.login');
            }

        });
}]);


