let path = require('path');
const Request = require('../models/Request');

module.exports = {
    renderpage: function(req, res, next){
        Request.find({UID:res.currentUser._id}).sort({TIMESTAMP:-1}).exec(function(err, requests){
            if(err){
                console.log(err)
            }else{
                res.render('request_history', {
                    currentUser     : res.currentUser,
                    requests        : requests,
                    totalRequests   : requests.length
                })
            }
        })
        
    }
}