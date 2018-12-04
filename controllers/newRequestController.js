const   mongoose    = require('mongoose'),
        User        = require('../models/User'),
        Oids        = require('../models/Oid'),
        Request     = require('../models/Request'), 
        Stringer    = require('../scripts/stringer'),
        timestamp   = require("../scripts/Timestamp");

module.exports = {
    ///newrequest route middlewares
    newRequest: function(req, res, next){
        console.log(req.body)
        //find ID of user making the request 
        User.findOne({username:req.session.passport.user}, (err, user)=>{
            if (err) {
                console.log(err);
                return
            }
            //add it to body of the request
            req.body.uid = user._id;
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
    saveRequest: function(req,res,next){
        if (req.body.requestType === 'aquilaOffKey') {
            Request.updateMany({UID:req.body.uid, CPEIP:req.body.cpeIP, WC:req.body.wc, MODEMIP:req.body.modemIP, MODEM: req.body.modemType, isON:true}, {$set:{isON:false}} , {new:true} , 
                function(err, updated){
                    if (err) {
                        console.log('Unable to update');
                        console.log(err);
                    }else{
                        console.log('Updated: one');
                        console.log(updated);
                    }
                })
                next();
        }else{
                    Request.create({UID:req.body.uid, CPEIP:req.body.cpeIP, WC:req.body.wc, MODEMIP:req.body.modemIP, MODEM: req.body.modemType, TIMESTAMP: new Date(), isON:true}, 
                    function(err, request){
                        if (err) {
                            console.log(err)
                        }else{
                            console.log('Request saved!');
                        }
                    })
                next();
        }        
    },
    generateString: function(req, res, next){
        //make new object passing to the obj constructor 
        console.log(req.body.requestType);
        let oidsToString = new Stringer(req.body, req.body.modemType, req.body.requestType);
        let str = oidsToString.returnString();
        res.send(str);
        res.end();

    }
}