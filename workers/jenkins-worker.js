exports.build = function(deployData, callback) {

	var server = deployData.server;
	var application = deployData.application;
	// TODO
	var jobName = 'TestJob';

	// global.jenkins.get_config_xml(jobName, function(err, data) {

	// 	console.log('config xml');
	// 	if (err) { 
	// 		console.log(err); 
	// 	}
	// 	console.log('config xml');
	// 	console.log(data)
	// });

	if(jobName === undefined || jobName == null || jobName.length == 0) {
		callback({success:false, data:{}, message:'Job name required.'});
	} else {	
		global.jenkins.job.build(jobName, function(err, data) {
			if (err){ 
				console.log(err); 
				callback({success:false, data:{}, message:err});	
			} else {
			  	console.log(data);
			  	callback({success:true, data:data, message:''});	
			}
		});	
	}
};



