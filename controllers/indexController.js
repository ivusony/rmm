const passport                = require('passport');
const User = require('../models/User');

module.exports = {
    showWelcome: function(req, res, next){
        next()
    },
    renderIndex : function(req, res, next){
        User.findByIdAndUpdate({_id:res.currentUser._id}, {$set:{firstLogin:false}}, {new:true},function(err, user){
            if (err) {
                console.log(err)
            }else{
                // console.log(user)
            }
        })

        // console.log(res.currentUser);

        res.render('index', {
           currentUser : res.currentUser
        })
        
    
    }
}