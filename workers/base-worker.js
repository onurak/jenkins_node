exports.getAll = function(dao, callback) {
	dao.getAll(function(result, data, message) {
		callback({success:result, data:data, message:message});
	});
};

exports.get = function(dao, object_id, callback) {
	dao.get(object_id, function(result, data, message) {
		callback({success:result, data:data, message:message});
	});
};

exports.save = function(dao, item, callback) {
	dao.save(item, function(result, data, message) {
		callback({success:result, data:data, message:message});
	});
};

exports.delete = function(dao, object_id, callback) {
	dao.delete(object_id, function(result, data, message) {
		callback({success:result, data:data, message:message});
	});
};