app.controller('ServersController', ['$scope', '$location', 'servers', '$mdDialog', '$mdMedia', '$mdToast',
	function ($scope, $location, item_resource, $mdDialog, $mdMedia, $mdToast) {

		$scope.selectItem = function(item) {
			$scope.selected = JSON.parse(JSON.stringify(item));;
	    };


	  	$scope.get_items = function() {
			var response = item_resource.get(function() {
				$scope.items = response.data;
		  	});
	  	};
	  	$scope.get_items();


	  	$scope.post_item = function(item) {

    		var response = item_resource.save({}, item, function(result) {

				if(response.success) {
    				$mdToast.show($mdToast.simple().textContent('Saved.').position('top right').hideDelay(3000));
    				$scope.items.push(result.data);
				} else {
					$mdToast.show($mdToast.simple().textContent(response.message).position('top right').hideDelay(3000));
				}
			});
    	};


	  	$scope.put_item = function(row) {


    		var updatedItem = {
    			_id: row[0],
        		descriptiveName: row[1],
        		serverIP: row[2],
        		serverDNSName: row[3],
        		rootUserName: row[4],
        		rootPassword: row[5],
        		comments: row[6]
        	};

	  		var response = item_resource.put({},updatedItem, function(result) {

				if(response.success) {
    				$mdToast.show($mdToast.simple().textContent('Updated.').position('top right').hideDelay(3000));					
		        	var updatedItem = null;
		    		for(var i = 0; i < $scope.items.length; i++) {
		    			if($scope.items[i]._id == row[0]) {
		    				updatedItem = result.data;
		    				break;
		    			}
		    		}
				} else {
					$mdToast.show($mdToast.simple().textContent(response.message).position('top right').hideDelay(3000));
				}
			});
    	};


    	$scope.delete_item = function(rows) {

    		for (var i = rows.length - 1; i >= 0; i--) {

    			var item_id = rows[i];
    			var response = item_resource.delete({object_id: item_id},{}, function(result) {

					if(response.success) {
	    				$mdToast.show($mdToast.simple().textContent('Deleted ' + item_id).position('top right').hideDelay(3000));
						$scope.items = $scope.items.filter(function(item) { 
					    	return item._id !== item_id
						});
					} else {
						$mdToast.show($mdToast.simple().textContent(response.message).position('top right').hideDelay(3000));
					}
				});
    		}
    	};

        function DialogController($scope, $mdDialog) {

        	$scope.item = {
        		descriptiveName: '',
        		serverIP: '',
        		serverDNSName: '',
        		rootUserName: '',
        		rootPassword: '',
        		comments: ''
        	};

			$scope.hide = function() {
			  //$mdDialog.hide();
			};

			$scope.cancel = function() {
			  $mdDialog.cancel();
			};

			$scope.answer = function(answer) {
			  $mdDialog.hide($scope.item);
			};
		}
	    
	    $scope.showAdvanced = function(ev) {
	    	$mdDialog.show({
	      		controller: DialogController,
				templateUrl: 'server.add.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: true
	    	})
	    	.then(function(answer) {
	    		$scope.post_item(answer);
	    	}, function() {
	      		//$scope.status = 'You cancelled the dialog.';
	    	});
	  	};
}]);


