exports.build = function(deployData, callback) {

	var server = deployData.server;
	var application = deployData.application;
	// TODO
	var jobName = 'TestJob';

	
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



