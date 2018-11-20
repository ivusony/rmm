const   mongoose = require('mongoose'),
        User        = require('../models/User'),
        Oids        = require('../models/Oid'),
        Stringer    = require('../scripts/stringer'),
        timestamp   = require("../scripts/getDate");

module.exports = {
    ///newrequest route middlewares
    newRequest: function(req, res, next){
        //find ID of user making the request 
        User.findOne({username:req.session.passport.user}, (err, user)=>{
            if (err) {
                console.log(err);
                return
            }
            //add it to body of the request
            req.body.uid = user._id;
            //add timestamp to the body off the request
            req.body.timestamp = timestamp.date();
            next();
        })
    },
    callOids : function(req, res, next){
        //fetch oids from DB based on odem type
        Oids.findOne({modem: req.body.modemType}, function(err, found){
            if (err) {
                console.log(err)
            }else{
                //add found modem config to the body of the request
                req.body.config = found
                next()
            }
        })
    },
    generateString: function(req, res, next){
        //make new object passing to the obj constructor 
        let oidsToString = new Stringer(req.body, req.body.modemType, req.body.requestType);
        let str = oidsToString.returnString();
        res.send(str);
        res.end();

    }
}