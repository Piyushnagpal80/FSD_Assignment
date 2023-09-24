var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Title:{
        type: String
    },
    Technologies:{
        type: String     
    },
    Frontend:{
        type: String
    },
    Backend:{
        type: String
    },
    Databases:{
        type: String
    },
    Infrastructre:{
        type: String
    }
},{
    capped:{size:1024},
    bufferCommands:false,
    autoCreate:false
});


module.exports = mongoose.model('User', userSchema);