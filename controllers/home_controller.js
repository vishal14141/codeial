const Post = require("../models/post");

module.exports.home = function(req,res){
    if(req.user){
    // Post.find({user:req.user._id}, function(err,posts){
    //     if(err){
    //         console.log("Error in finding posts");
    //         return;
    //     }

    //     return res.render('home', {
    //         title : 'Home',
    //         posts: posts
    //     });

    // })

    // Post.find({user:req.user._id}).populate('user').exec(function(err, posts){

    //     for(post of posts){
    //         post.comments
    //     }

    //     return res.render('home', {
    //         title : 'Home',
    //         posts: posts
    //     });
    // })
    Post.find({}).populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
        }
    }).exec(function(err,posts){
        return res.render('home', {
            title : 'Home',
            posts: posts
        });
    })
  }

  else{
      return res.render('home',{
          title:"Home"
      })
  }

}
