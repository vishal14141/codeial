const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        console.log(`Create post is : ${post}`);
        req.flash('success', 'Post created Successfully');
        return res.redirect('/');
    } catch (error) {
        req.flash('error', err);
        console.log(`Error is : ${error}`);
    }

}

module.exports.destroy =async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.param.id }, function (err) {
                req.flash('success', 'Post deleted Successfully');
                return res.redirect('/');
            })
        }
        // .id means converting the object id into string 
        else {
            res.redirect('back');
        }
    } catch (error) {
        console.log(`Error is : ${error}`);
    }

}


