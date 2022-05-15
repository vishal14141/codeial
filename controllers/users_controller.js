const User = require('../models/user');

module.exports.profile = function(req,res){
    res.render('user_profile');
}

module.exports.login = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',34)
    res.render('login');
}

module.exports.register = function(req,res){
    res.render('signup');
}

module.exports.createUser = function(req,res){
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding user in signing up");return ;}

            if(! user){
                User.create(req.body, function(err, user){
                    if(err){console.log("Error in saving the user");return;}
                    
                    console.log(`Stored user is: ${user}`);
                    return res.redirect('/login');
                })
            }

            return res.redirect('/login');
    })
}