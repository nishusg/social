var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String ,
    password: String,
    email: String,
    name: String,
    image: String,
    bio: String,
    website: String,
    friends:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "Friend"
        }
    ],
    sentrequest:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "SentRequest"
        }
    ],
    posts :[{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "Post"
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);