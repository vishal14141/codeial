const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell passport to use new strategy for googlw login
passport.use(new googleStrategy({
    clientID: '167970599893-ajubmd70m587vf3r3m4m9anaotp396gk.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
}, 
  function(accessToken, refreshToken,profile, done){
      User.findOne({email: profile.emails[0].value}).exec(function(err,user){
          if(err){console.log("Error in google strategy passport", err); return;}
          
          console.log(accessToken);
          console.log(profile);

          if(user){
              return done(null, user);
          }
          else{
              User.create({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        if(err){console.log("Error in creating user", err); return;}
                    }
                    return done(null, user);
                })
          }
      })
  }
))

module.exports = passport;