const Post = require('../models/post');

module.exports.createPost = function (req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function (err, post) {
        if (err) {
            console.log("Error in creating the post");
            return;
        }
        console.log(post);
        return res.redirect('/');
    })

}

module.exports.upload = function (req, res) {
    return res.end('<h1>Post uploaded successfullt</h1>');
}

module.exports.delete = function (req, res) {
    return res.end('<h1>Post deleted Successfully</h1>');
}