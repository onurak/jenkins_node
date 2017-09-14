angular.module('adminApp.services.apps', [])
	.factory('apps', ['$resource', function($resource) {
        return $resource('/api/applications/:object_id', {object_id: '@object_id'},
            { 
                get:    {method:'GET'},
                post:   {method:'POST'},
                put:   {method:'PUT'},
                delete: {method:'DELETE'}
        });
    }]);

    


