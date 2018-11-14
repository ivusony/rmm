passport                = require('passport');

module.exports = {
    redirect: function(req, res, next){
        res.redirect('/login')
    },
    authUser: function(req, res, next){
    console.log(req.body);
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.redirect('/login'); 
        }
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
        req.logout();
        res.redirect('/login')
    }
}