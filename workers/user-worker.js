var bcrypt 			= require('bcrypt');
var crypto			= require('crypto');
var dao 			= require(__base + 'datalayer/user-dao');
var base_worker 	= require(__base + 'workers/base-worker');

exports.getAll = function(callback) {
	base_worker.getAll(dao, callback);
};

exports.get = function(object_id, callback) {
	base_worker.get(dao, object_id, callback);
};

exports.getByToken = function(token, callback) {
	dao.getByToken(token, callback);
};

exports.getByUsername = function(username, callback) {
	dao.getByUsername(username, callback);
}

exports.save = function(new_user, item, callback) {
	if(new_user) {
		item.password = bcrypt.hashSync(item.password, bcrypt.genSaltSync(10));		
		item.token = crypto.randomBytes(64).toString('hex');	
	}
	item.tokenExpiration = new Date(new Date().getTime() + 60 * 60 * 1000);
	
    base_worker.save(dao, item, callback);
};

exports.delete = function(object_id, callback) {
	base_worker.delete(dao, object_id, callback);
};