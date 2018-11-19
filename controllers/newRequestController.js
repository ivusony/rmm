const   mongoose = require('mongoose'),
        User        = require('../models/User'),
        Oids        = require('../models/Oid'),
        Stringer    = require('../scripts/stringer'),
        timestamp   = require("../scripts/getDate");

module.exports = {
    //
    newRequest: function(req, res, next){
        User.findOne({username:req.session.passport.user}, (err, user)=>{
            req.body.uid = user._id;
            req.body.timestamp = timestamp.date();
            next();
        })
    },
    callOids : function(req, res, next){
        Oids.findOne({modem: req.body.modemType}, function(err, found){
            if (err) {
                
                console.log(err)
            }else{
                req.body.config = found
                next()
            }
        })
    },
    generateString: function(req, res, next){
        
        let oidsToString = new Stringer(req.body, req.body.modemType, req.body.requestType);
        res.send(oidsToString.returnString());


    }
}