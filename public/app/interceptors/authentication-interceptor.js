
angular.module('adminApp.interceptors.authentication', [])
	.factory('authenticationInterceptor', ['$q', '$window', '$location', '$injector',  function($q, $window, $location, $injector) {

        return {
            request: function (config) {

                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers['x-access-token'] = $window.sessionStorage.token;
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

