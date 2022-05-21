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

module.exports.destroy= function(req,res){
    // Comment id, userId that is present in the comment

    Comment.findById(req.params.id, function(err,comment){

        Post.findById(comment.post, function(err,post){

        if(err){console.log(`Error in fetching comment: ${err}`); return;}

        if(comment.user == req.user.id || req.user.id == post.user){
            comment.remove();
            //Delete array element containing comment Id from post.comment array
            Post.findByIdAndUpdate(comment.post,{$pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
    })
}