const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;


//Authentication using passport

passport.use(new LocalStrategy({
    usernameField : 'email'
  },
  function(email, password, done){
      //Establish the identity
      User.findOne({email:email}, function(err, user){
          if(err){
              console.log("Error in finding user --> Passport");
              return done(err);
          }
          if(!user || user.password != password){
              console.log("Invalid username/password");
              return done(null,false);
          }
          console.log("Everything seems okay, user can proceed to profile page");
          return done(null, user);
      })
  }
));

//Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null, user.id);
})



//deserializing the user from the key in the cookies 
passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null, user);
    })
})


//check is the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //If the user is signed in, then pass on the request to the next function
    if(req.isAuthenticated()){
        return next();
    }

     // If the user is not signed in
     else{
        return res.redirect('/users/login');
     }
    
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session 
        //and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    return next();
}

passport.shouldRenderNext = function(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return next();
}

module.exports = passport;