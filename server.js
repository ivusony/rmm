{
    const   express                 = require('express'),
            router                  = express.Router(),
            app                     = express(),
            port                    = 5000,
            bodyParser              = require('body-parser'),
            mongoose                = require('mongoose'),
            passport                = require('passport'),
            localStrategy           = require('passport-local'),
            passportLocalMongoose   = require('passport-local-mongoose'),
            expressSanitizer        = require('express-sanitizer'),
            methodOverride          = require('method-override');
            
    const   socket          = require('./IO/setup');
   

    const   server          = app.listen(port, ()=>{
                console.log('RMM server running')
            })
    
            socket(server);

            //usel model
    const User = require('./models/User');   

            //connect to db
            mongoose.connect('mongodb://localhost/rmm',  { useNewUrlParser: true })
            .then((success)=>{
                console.log('Connected to RMM DB');
            })
            .catch((err)=>{
                console.log('Error connecting to RMM DB')
            })
            //session
            app.use(require('express-session')(
                {
                    secret: 'secret',
                    resave: false,
                    saveUninitialized: false
                }
            ));
            //view engine
            app.set('view engine', 'ejs');   
            //public folder
            app.use(express.static(__dirname + '/public'));
            //body parser
            app.use(bodyParser.urlencoded({extended: true}));
            //sanitizer
            app.use(expressSanitizer());
            //PASSPORTJS SETUP
            app.use(passport.initialize());
            app.use(passport.session());
            app.use(methodOverride('_method'));
            passport.use(new localStrategy(User.authenticate())); 
            passport.serializeUser(User.serializeUser());
            passport.deserializeUser(User.deserializeUser());


            app.use(function(req, res, next){
                res.currentUser = req.user;
                next();
            });

    //routes
    const loginRoute            = require('./routes/loginRoute');
    const indexRoute            = require('./routes/indexRoute');
    const newRequestRoute       = require('./routes/newRequestRoute');
    const requestHistoryRoute   = require('./routes/requestHistoryRoute');
    const profileRoute          = require('./routes/profileRoute');
    const statsRoute            = require('./routes/statsRoute');
    const deviceScanner          = require('./routes/devicescanner');
    const messagesRoute         = require('./routes/messagesRoute');

        
    
   
            app.use(loginRoute);
            
            app.use(indexRoute);
            app.use(newRequestRoute);
            app.use(requestHistoryRoute);
            app.use(profileRoute);
            app.use(statsRoute);
            app.use(deviceScanner);
            app.use(messagesRoute());


           
         
           
}