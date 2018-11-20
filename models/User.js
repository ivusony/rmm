var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');



var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    password: String,
    requests: Array,
    isAdmin: Boolean,
    fullName: String
});

UserSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model('User', UserSchema);