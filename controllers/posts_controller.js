const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = function(req,res){

    Post.findById(req.params.id, function(err,post){

        if(err){console.log(`Error in fetching post : ${err}`); return;}

        // .id means converting the object id into string 
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.param.id}, function(err){
                return res.redirect('/');
            })
        }
        else{
            res.redirect('back');
        }
    })
}


