var mongoose = require('mongoose');




var RequestSchema = new mongoose.Schema({
    UID: String,
    CPEIP: String,
    WC: String,
    MODEMIP: String,
    MODEM: String,
    TIMESTAMP: Object,
    isON: Boolean
});





module.exports = mongoose.model('Request', RequestSchema);