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
        if (req.body.modemType === 'cisco' && req.body.requestType === 'aquilaKey') {
            console.log(`${req.body.config.pre} ${req.body.wc} ${req.body.modemIP} ${req.body.config.OIDOn} \n`);
        }else if(req.body.modemType === 'thomson' && req.body.requestType === 'aquilaKey'){
            console.log(`${req.body.config.pre} ${req.body.wc} ${req.body.modemIP} ${req.body.config.OIDOn.part1} \n${req.body.config.pre} ${req.body.wc} ${req.body.modemIP} ${req.body.config.OIDOn.part2}`);
        }
        //continue here

    }
}