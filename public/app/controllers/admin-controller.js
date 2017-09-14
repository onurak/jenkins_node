app.controller('AdminController', ['$scope', '$location', '$q', '$window', '$location', '$injector',
	function ($scope, $location, $q, $window, $location, $injector) {

    	$scope.isAuthenticated = false;
    	if ($window.sessionStorage.token) {
            $scope.isAuthenticated = true;
        }

    	console.log('AdminController');


        $scope.$on('authentication', function (event, args) {
            $scope.isAuthenticated = args;
            console.log('authentication received');
            console.log($scope.isAuthenticated);
        });
}]);


