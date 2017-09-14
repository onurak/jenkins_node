var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deploySchema = new Schema({
        server: String,
        application: String
    });

module.exports = mongoose.model('deploy', deploySchema);