var base_dao    = require(__base + 'datalayer/base-dao');
var model       = require(__base + 'models/user');

exports.getByUsername = function(userName, callback) {

    model.findOne({userName: userName}, {}, function(err, item) {
        callback(item);
    });
}

exports.getByToken = function(token, callback) {
    
    console.log('getbytoken');
    console.log(token);
    model.findOne({token: token}, {}, function(err, item) {
        console.log(item);
        callback(item);
    });
}

exports.getAll = function(callback) {
    base_dao.getAll(model, function(item) {
        return item.userName;
    }, callback);
}

exports.get = function(object_id, callback) {
    base_dao.get(model, object_id, callback);
}

exports.save = function(item, callback) {
    base_dao.save(model, item, callback);
}

exports.delete = function(object_id, callback) {
    base_dao.delete(model, object_id, callback);
}

