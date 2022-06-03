const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const  db = require('./config/mongoose');

const session = require('express-session');

//Used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

const passportGoogle = require('./config/passpor-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
// const MongoDBStore = require('connect-mongodb-session')(session);

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));
//Make the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);

//Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//Set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Mongo store is used to store session cookie in db
app.use(session({
    name: 'codeial',
    //Todo change the secret before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave: false,
    cookie: {
        maxAge : (1000*60*100)
    },
    Store : new MongoStore({
        mongoUrl:'mongodb://localhost:27017',
        collectionName: 'mongoose_development',
        autoRemove:'disabled'
    }, function(err){
        console.log(err || 'connect mongo-db ok');
    }) 
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMWare.setFlash);

//Use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){
        console.error(err);
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running  on port: ${port}`);

})