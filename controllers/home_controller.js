const res = require("express/lib/response");

module.exports.home = function(req,res){
    return res.end('<h1> Express is up for codial</h1>');
}


module.exports.actionName = function(req,res){
    return res.end("Slowly i am getting the point");
}