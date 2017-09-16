app.controller('DeploysController', 
	['$scope', '$location', 'deploys', 'apps', 'servers', '$mdDialog', '$mdMedia', '$mdToast', 'jenkins',
	function ($scope, $location, item_resource, apps, servers, $mdDialog, $mdMedia, $mdToast, jenkins) {


		var selected_item = null;
		$scope.selected = 0;

		$scope.select_item = function(item_ids) {

			if(item_ids.length > 0) {
				$scope.selected = 2;
			} else {
				$scope.selected = 0;
			}

			if(item_ids.length == 1) {
				$scope.selected = 1;
				for(var i = 0; i < $scope.items.length; i++) {
	    			if($scope.items[i]._id == item_ids[0]) {
	    				selected_item = $scope.items[i];
	    				break;
	    			}
	    		}
			} else {
				selected_item = null;
			}
	    };


	  	$scope.get_items = function() {
			var response = item_resource.get(function() {
				$scope.items = response.data;
		  	});
	  	};
	  	$scope.get_items();


	  	$scope.post_item = function(item) {

    		var response = item_resource.save({}, item, function(result) {
    			selected_item = null;
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
        		server: row[1],
        		application: row[2]
        	};

	  		var response = item_resource.put({},updatedItem, function(result) {
  				selected_item = null;
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

        	var responseApps = apps.get(function() {
        		$scope.apps = responseApps.data;
		  	});

		  	var responseServers = servers.get(function() {
        		$scope.servers = responseServers.data;
		  	});

        	$scope.item = {
        		server: '',
        		application: ''
        	};
        	if(selected_item != null) {
        		$scope.item = JSON.parse(JSON.stringify(selected_item))
        	}

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

	    	if($scope.selected == 2) {
	    		$mdToast.show($mdToast.simple().textContent('Please select only one item').position('top right').hideDelay(3000));
	    	} else {
    			$mdDialog.show({
		      		controller: DialogController,
					templateUrl: 'deploy.add.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose:true,
					fullscreen: true
		    	})
		    	.then(function(answer) {
		    		if(selected_item == null) { 
		    			$scope.post_item(answer);
		    		} else {
						$scope.put_item(answer);
		    		}
		    	}, function() {
		      		//$scope.status = 'You cancelled the dialog.';
		    	});
	    	}	    	    
	  	};

	  	$scope.deployJob = function() {

	    	if($scope.selected == 0) {
	    		$mdToast.show($mdToast.simple().textContent('Please select an application to deploy...').position('top right').hideDelay(3000));
	    	} else if($scope.selected == 2) {
	    		$mdToast.show($mdToast.simple().textContent('Please select only one application to deploy...').position('top right').hideDelay(3000));
	    	} else {
    			
    			var response = jenkins.save({}, selected_item, function(result) {
	    			if(response.success) {
	    				$mdToast.show($mdToast.simple().textContent('Saved.').position('top right').hideDelay(3000));
					} else {
						$mdToast.show($mdToast.simple().textContent(response.message).position('top right').hideDelay(3000));
					}
				});

	    	}

	  	};
}]);


