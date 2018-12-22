const mongoose = require('mongoose'),
    User = require('../models/User'),
    passportLocalMongoose = require('passport-local-mongoose');



    mongoose.connect('mongodb://localhost/rmm');




    User.register(new User({email: 'example@example.com', username: 'test2', isAdmin: false, fullName: "Pera Peric", firstLogin: true, prefferedKeys: 'aquila', webInterface:'window'}),'test2', function(err, user){
        if (err) {
            console.log('=================================');
            console.log('Error adding user:');
            console.log(err);
            console.log('=================================');
        }else{
            console.log('=================================');
            console.log('User added:');
            console.log(user);
            console.log('================================='); 
        }
    })

