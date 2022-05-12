module.exports.upload = function(req,res){
    return res.end('<h1>Post uploaded successfullt</h1>');
}

module.exports.delete = function(req,res){
    return res.end('<h1>Post deleted Successfully</h1>');
}