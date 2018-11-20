const   mongoose    = require('mongoose'),
        User        = require('../models/User'),
        Oids        = require('../models/Oid'),
        Request     = require('../models/Request'), 
        Stringer    = require('../scripts/stringer'),
        timestamp   = require("../scripts/getDate"),
        moment      = require('moment');

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
        Request.findOne({UID:req.body.uid, CPEIP:req.body.cpeIP, WC:req.body.wc, MODEMIP:req.body.modemIP, isON:true}, 
            function(err, found){
                if (!found) {
                    Request.create({UID:req.body.uid, CPEIP:req.body.cpeIP, WC:req.body.wc, MODEMIP:req.body.modemIP, MODEM: req.body.modemType, TIMESTAMP: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"), isON:true}, 
                    function(err, request){
                        if (err) {
                            console.log(err)
                        }else{
                            console.log('Request saved!');
                        }
                    })
                }else{
                    //HERE TO CONTINUE BECAUSE THIS IS BEING TRIGGERED BY THE ON KEY INSTED OF THE OFF KEY
                    Request.findOneAndUpdate({UID:req.body.uid, CPEIP:req.body.cpeIP, WC:req.body.wc, MODEMIP:req.body.modemIP, isON:true}, 
                        {$set:{isON:false}}, function(err, updated){
                            if (err) {
                                console.log(err)
                            }else{
                                console.log('Document found and updated')
                            }
                        })
                }
            })
        
        next();
    },
    generateString: function(req, res, next){
        //make new object passing to the obj constructor 
        let oidsToString = new Stringer(req.body, req.body.modemType, req.body.requestType);
        let str = oidsToString.returnString();
        res.send(str);
        res.end();

    }
}