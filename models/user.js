var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
        userName: String,
        password: String,
        token: String,
        tokenExpiration: Date,
    });


userSchema.pre('save', function(next) {

    this.tokenExpiration = new Date(new Date().getTime() + 60 * 60 * 1000);
    next();
});

module.exports = mongoose.model('user', userSchema);
