module.exports = {
    renderPage: function(req, res, next){
        res.render('profile', {
            currentUser : res.currentUser
        });
        next()
    },
    updateProfile: function(req, res, next){
        console.log(req.body);
        User.findOneAndUpdate({username:res.currentUser.username}, {$set:{fullName:req.body.fullName, email:req.body.email}}, {new:true} ,function(err, updated){
            if (err) {
                console.log(err)
            }else{
            }
        })

        if(req.body.oldPass.length != 0 && req.body.newPass != 0){
            User.findOne({username:res.currentUser.username}).then((user)=>{
                user.changePassword(req.body.oldPass, req.body.newPass, function(err, updated){
                    if(err){
                        console.log(err);
                        res.redirect('/profile');
                    }else{
                        res.redirect('/logout');
                    }
                });
                
            }).catch((err)=>{
                console.log(err)
            })
        }
        

       
       
    }
}