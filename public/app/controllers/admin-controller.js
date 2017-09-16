app.controller('AdminController', ['$scope', '$location', '$q', '$window', '$location', '$injector', '$cookies', '$state', '$stateParams', 
	function ($scope, $location, $q, $window, $location, $injector, $cookies, $state,   $stateParams) {

    	$scope.isAuthenticated = false;
        var token = $cookies.getObject('token');
    	if (token) {
            $scope.isAuthenticated = true;
        }


        $scope.$on('authentication', function (event, args) {
            $scope.isAuthenticated = args.result;

            if ($scope.isAuthenticated) {         
                $cookies.putObject('token', args.token);
                $state.go('admin.servers');
            } else {
                $mdToast.show($mdToast.simple().textContent('Unable to login: ' + response.message).position('top right').hideDelay(3000));
                $cookies.removeObject('token');
                $state.go('admin.login');
            }

        });
}]);


