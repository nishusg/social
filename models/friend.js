var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
    friend :{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "User"
    }
},{timestamps:true});

module.exports = mongoose.model("Friend", FriendSchema);