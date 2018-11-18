const   mongoose = require('mongoose'),
        User        = require('../models/User'),
        Oids        = require('../models/Oid'),
        timestamp   = require("../scripts/getDate");

module.exports = {
    newRequest: function(req, res, next){
        User.findOne({username:req.session.passport.user}, (err, user)=>{
            req.body.uid = user._id;
            req.body.timestamp = timestamp.date();
            next();
        })
    },
    callOids : function(req, res, next){
        // res.send(req.body);
        // res.end();
        Oids.findOne({modem: req.body.modemType}, function(err, found){
            if (err) {
                console.log(err)
            }else{
                res.send(found);
                res.end();
            }
        })
    }
}