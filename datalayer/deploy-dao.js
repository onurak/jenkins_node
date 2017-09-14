var _ = require('underscore');
var base_dao = require(__base + 'datalayer/base-dao');
var model = require(__base + 'models/deploy');

exports.getAll = function(callback) {
    base_dao.getAll(model, function(item) {
        return item.server;
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

