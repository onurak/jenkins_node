angular.module('adminApp.services.deploys', [])
	.factory('deploys', ['$resource', function($resource) {
        return $resource('/api/deploys/:object_id', {object_id: '@object_id'},
            { 
                get:    {method:'GET'},
                post:   {method:'POST'},
                put:   {method:'PUT'},
                delete: {method:'DELETE'}
        });
    }]);

    


