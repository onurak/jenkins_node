var dao             = require(__base + 'datalayer/application-dao');
var base_worker     = require(__base + 'workers/base-worker');

exports.getAll = function(callback) {
    base_worker.getAll(dao, callback);
};

exports.get = function(object_id, callback) {
    base_worker.get(dao, object_id, callback);
};

exports.save = function(item, callback) {
    base_worker.save(dao, item, callback);
};

exports.delete = function(object_id, callback) {
    base_worker.delete(dao, object_id, callback);
};