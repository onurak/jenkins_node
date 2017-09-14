var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serverSchema = new Schema({
        descriptiveName: String,
        serverIP: String,
        serverDNSName: String,
        rootUserName: String,
        rootPassword: String,
        comments: String
    });

module.exports = mongoose.model('server', serverSchema);
