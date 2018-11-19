
    
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

    let configArray = [
    {
        name: 'cisco',
        config: ciscoConfig
    },
    {
        name: 'thomson',
        config: thomsonConfig
    }]

    configArray.forEach(el => 
    {
        Oids.findOne({modem: el.name}, (err, modem)=>{
            if (err) {
                console.log(err)
            }else{
                if (modem===null) {
                    Oids.create(el.config, (err, saved)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log('++++++++++++++++++++++++++++++++++++++');
                            console.log(`++++++++${el.name} modem OIDs saved++++++++`);
                            console.log(saved);
                            console.log('++++++++++++++++++++++++++++++++++++++');
                        }
                    })
                }else{
                    console.log('++++++++++++++++++++++++++++++++++++++++');
                    console.log(`+++++${el.name} modem OIDs already in DB+++++`);
                    console.log('++++++++++++++++++++++++++++++++++++++++');
                }
            }
        })
    })

    

    
