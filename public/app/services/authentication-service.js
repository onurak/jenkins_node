angular.module('adminApp.services.authentication', [])
    .factory('authentication', ['$resource', function($resource) {
        return $resource('/api/authenticate', {},
            { 
                post:  {method:'POST'}
            }
        );
    }]);

    


