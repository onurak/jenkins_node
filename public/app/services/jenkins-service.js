angular.module('adminApp.services.jenkins', [])
    .factory('jenkins', ['$resource', function($resource) {
        return $resource('/api/jenkins', {},
            { 
                post:  {method:'POST'}
            }
        );
    }]);

    


