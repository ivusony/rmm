var mongoose = require('mongoose');




var MessageSchema = new mongoose.Schema({
    UID: String,
    BODY: String,
    TIMESTAMP: String
});





module.exports = mongoose.model('Message', MessageSchema);