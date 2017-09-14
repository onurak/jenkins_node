var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
        name: String,
        jobName: String,
        comments: String
    });

module.exports = mongoose.model('application', applicationSchema);
