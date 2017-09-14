var _           = require('underscore');
var mongoose    = require('mongoose');

exports.getAll = function(model, sort, callback) {

    model.find({}, {}, function(err, list) {
        if (err) {
            callback(false, [], 'Can not retrieve from db. Detail: ' + err);
        } else {
            list = _.sortBy(list, sort)
            callback(true, list, '');
        }
    });
}


exports.get = function(model, object_id, callback) {
    
    model.findOne({_id: object_id}, {}, function(err, item) {
        if (err) {
            callback(false, {}, 'Can not retrieve from db. Detail: ' + err);
        } else {
            callback(true, item, '');
        }
    });
}

exports.save = function(model, item, callback) {

    if(item._id === undefined || item._id == null) {
        item._id = new mongoose.mongo.ObjectID();
    }

    model.findOneAndUpdate({_id: item._id}, item, {upsert:true, new: true}, function(err, existingItem){
        if (err) {
            callback(false, {}, 'Can not save to db. Detail: ' + err);
        } else {
            callback(true, existingItem, '');
        }
    });
    /*
    model.findOne({id: object_id}, {}, function(err, existingItem) {
        if (err) {
            callback(false, {}, 'Can not retrieve from db. Detail: ' + err);
        } else {
            callback(true, existingItem, '');
        }
    });
    */
}

exports.delete = function(model, object_id, callback) {
    
    model.remove({_id: object_id}, function(err, removed) {
        if (err) {
            callback(false, {}, 'Can not retrieve from db. Detail: ' + err);
        } else {
            callback(true, {}, '');
        }
    });
}
