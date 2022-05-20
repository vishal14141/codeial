const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.addComment = function(req,res){

    Post.findById(req.body.post, function(err,post){
        if(post){

            Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            }, function(err,comment){
                if(err){console.log(`Error in creating comment: ${err}`); return;}
        
                console.log(`Comment is ${comment}`);
        
                post.comments.push(comment._id);
                post.save();
        
                return res.redirect('/');
        
            })
        }
    });

    

}