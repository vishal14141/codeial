const { use } = require('passport');
const User = require('../models/user');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    })
}

module.exports.updateProfile = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            console.log(`Updated User: ${user}`)
            return res.redirect('/');
        })
    }
    else {
        return res.status(401).send('UnAuthorized');
    }
}

module.exports.login = function (req, res) {
    res.render('login');
}

module.exports.register = function (req, res) {
    res.render('signup');
}

module.exports.createUser = async function (req, res) {
    try {
        if (req.body.password != req.body.confirmPassword) {
            console.log("Password is not matching");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            console.log("On the path to create new user");
            let user = await User.create(req.body);
            console.log(`Created user id : ${user}`);
            return res.redirect('/users/login');
        }
        else {
            console.log('User is already there');
            return res.redirect('/users/login');
        }
    } catch (error) {
        console.log(`Error is : ${error}`);
    }
}

//Sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'Logged out Successfully');
    return res.redirect('/');
}

