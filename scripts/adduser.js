var mongoose = require('mongoose'),
    User = require('../models/User'),
    passportLocalMongoose = require('passport-local-mongoose');

    const bcrypt = require('bcrypt');
    const saltRounds = 10;


    mongoose.connect('mongodb://localhost/rmm');




    // User.register(new User({email: 'example@example.com', username: 'test', isAdmin: true}),'test', function(err, user){
    //     if (err) {
    //         console.log('=================================');
    //         console.log('Error adding user:');
    //         console.log(err);
    //         console.log('=================================');
    //     }else{
    //         console.log('=================================');
    //         console.log('User added:');
    //         console.log(user);
    //         console.log('================================='); 
    //     }
    // })

    User.findOne({username:'test'}).then((user)=>{
        user.changePassword('test2', 'test');
    }).catch((err)=>{
        console.log('Unable to change password')
    })