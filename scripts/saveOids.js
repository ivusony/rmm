
    
    var mongoose = require('mongoose');
    let Oids = require('../models/Oid');
    let ciscoConfig = require('./cisco');
    let thomsonConfig = require('./thomson');
    mongoose.connect('mongodb://localhost/rmm',  { useNewUrlParser: true })
    .then((success)=>{
        console.log('Connected to RMM DB');
    })
    .catch((err)=>{
        console.log('Error connecting to RMM DB')
    })

    Oids.create(ciscoConfig, (err, saved)=>{
        if(err){
            console.log(err)
        }else{
            console.log(saved)
        }
    })
