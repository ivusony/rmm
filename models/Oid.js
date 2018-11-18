var mongoose = require('mongoose');



var OidSchema = new mongoose.Schema({
    modem: {
        type: String,
        required: true
    },
    aquilaOn :{
        pre: Object,
        OID: Object
    },
    aquilaOff:{
        pre: Object,
        OID: Object
    }
});





module.exports = mongoose.model('Oids', OidSchema);