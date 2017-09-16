var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
        name: String,
        jobName: String,
        comments: String
    }, { versionKey: false });

module.exports = mongoose.model('application', applicationSchema);
