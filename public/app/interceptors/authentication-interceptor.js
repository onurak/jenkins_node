
angular.module('adminApp.interceptors.authentication', [])
	.factory('authenticationInterceptor', ['$q', '$window', '$location', '$injector',  '$cookies', 
        function($q, $window, $location, $injector, $cookies, $state,   $stateParams) {

        return {
            request: function (config) {

                config.headers = config.headers || {};

                var token = $cookies.getObject('token');
                if (token) {
                    config.headers['x-access-token'] = token;
                }
                return config;
            },
            response: function (response) {

                


                return response || $q.when(response);
            },
                responseError: function(error){
                    
                    console.log("//ERROR//");
                    console.log(error);
                    $window.location = '/login';
                    return $q.reject(error);
                }
        };
    }]);

