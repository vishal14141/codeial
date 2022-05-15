const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose_development');

const db= mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to mongodb"));

db.once('open', function(){
    console.log('Connected to database :: MongoDB');
});

module.exports = db;