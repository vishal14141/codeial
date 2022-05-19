const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile');
}

module.exports.login = function(req,res){
    res.render('login');
}

module.exports.register = function(req,res){
    res.render('signup');
}

module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirmPassword){
        console.log("Password is not matching");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user in signing up");return ;}

            if(! user){
                console.log("On the path to create new user");
                User.create(req.body, function(err, user){
                    if(err){console.log("Error in saving the user");return;}
                    
                    console.log(`Stored user is: ${user}`);
                    return res.redirect('/users/login');
                })
            }
            else{
                return res.redirect('/users/login');
            }
       
    })
}

//Sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}

