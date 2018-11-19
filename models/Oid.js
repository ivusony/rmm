var mongoose = require('mongoose');



var OidSchema = new mongoose.Schema({
    modem: {
        type: String,
        required: true
    },
    pre: {
        type: String,
        required: true
    },
    OIDOn :{
        type: Object || String,
        required: true
    },
    OIDOff:{
        type: Object || String,
        required: true
    }
});





module.exports = mongoose.model('Oids', OidSchema);