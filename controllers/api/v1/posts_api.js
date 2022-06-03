const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index =async function(req,res){

    let posts = await Post.find({})
                .sort('-createdAt')
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user',
                    }
                });
    for(let post of posts){
        post.user.password = null;
    }
    
    return res.json(200, {
        message : "List of Posts",
        posts : posts
    })
}

module.exports.destroy =async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.param.id });
            
         //   req.flash('success', 'Post deleted Successfully');
            return res.json(200, {
                message: 'Post and associated comments Deleted Successfully'
            });
    
        // .id means converting the object id into string 
        }else {
            return res.json(401,{
                message: "You Cant delete this post"
            })
        }
    } catch (error) {
        console.log("Error");
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }

}