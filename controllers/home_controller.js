const Post = require("../models/post");
const User = require('../models/user');

module.exports.home = async function (req, res) {
    if (req.user) {
        
        try {

            let posts = await Post.find({}).populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                    }
                });

            let users = await User.find({});

            return res.render('home', {
                title: 'Home',
                posts: posts,
                all_users: users
            });

        } catch (error) {
            console.log(`Error is: ${error}`);
            return;
        }

    }

    else {
        return res.render('home', {
            title: "Home"
        })
    }

}
