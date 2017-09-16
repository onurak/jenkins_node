var bcrypt      = require('bcrypt');
var crypto      = require('crypto');
var userWorker  = require(__base + 'workers/user-worker');


module.exports.authenticate = function(username, password, callback) {
	
	if (!username || !password) {
    	return callback({success:false, message:'Username and password required'});
  	}

	userWorker.getByUsername(username, function(user) {
        
        if(user) {

            if (bcrypt.compareSync(password, user.password)) {

            	if (!user.tokenExpiration || user.tokenExpiration < new Date()) {

            		user.token = crypto.randomBytes(64).toString('hex');
            	}
            	
                userWorker.save(false, user, function(data) {

                    if(data) {
                        callback({success:true, token:user.token, message:''});
                    } else {
                        callback({success:false, data:{}, message:'Can not create session'});
                    }
                });
            } else {
                callback({success:false, data:{}, message:'Incorrect username/password'});
            }
        } else {

            callback({success:false, data:{}, message:'Incorrect username/password'});
        }
    });
}

module.exports.verifyToken = function(token, callback) {

    userWorker.getByToken(token, function(user) {
        if(user) {

            if(user.tokenExpiration > new Date()) {

                userWorker.save(false, user, function(data) {

                    if(data) {
                        callback({success:true, data:user, message:''});
                    } else {
                        callback({success:false, data:{}, message:'Can not update session'});
                    }
                });
            } else {
                callback({success:false, data:{}, message:'Token expired'});
            }
        } else {

            callback({success:false, data:{}, message:'Incorrect token'});
        }
    });
}