angular.module('adminApp.services.servers', [])
	.factory('servers', ['$resource', function($resource) {
        return $resource('/api/servers/:object_id', {object_id: '@object_id'},
            { 
                get:    {method:'GET'},
                post:   {method:'POST'},
                put:   {method:'PUT'},
                delete: {method:'DELETE'}
        });
    }]);

    


