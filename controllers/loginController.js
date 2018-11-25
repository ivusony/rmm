const passport  = require('passport');
const User      = require('../models/User');
const date = require('../scripts/Timestamp');

module.exports = {
    redirect: function(req, res, next){
        res.redirect('/login')
    },
    authUser: function(req, res, next){
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect('/login'); 
        }
        //set current timestamp as lastActive and online status
        User.findByIdAndUpdate({_id:user._id}, {$set:{lastActive: date.format()}, online:true}, function(err, updated){
            if(err){
                console.log(err)
            }
        })
        req.logIn(user, function(err) {
          if (err) { 
              return next(err); 
            }
          return res.redirect('/index');
        });
      })(req, res, next);
    },
    isLoggedIn : function isLoggedIn(req, res, next){
        if (req.isAuthenticated()) {
            return next();
        }
        res.render('login');
    },
    logout: function(req, res){
        //update online status
        User.findByIdAndUpdate({_id:res.currentUser._id}, {$set:{online:false}}, function(err, updated){})
        req.logout();
        res.redirect('/login')
    }
}