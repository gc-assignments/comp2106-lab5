var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// create the account schema
var AccountSchema = new Schema({
    name: String,
    someID: String
});

AccountSchema.plugin(passportLocalMongoose);

// make public to the rest of the app
module.exports = mongoose.model('Account', AccountSchema);
