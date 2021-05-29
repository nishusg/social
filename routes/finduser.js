var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport");
var router      = express.Router();
var User        = mongoose.model("User");
var Post        = mongoose.model("Post");
var middleware = require("../middleware");
router.get("/finduser",middleware.isLoggedIn,function(req,res){
    User.find({},function(err,user){
        if(err)
            console.log(err);
        else
            res.render("finduser",{user:user,status:0});
    });
});
router.post("/finduser",middleware.isLoggedIn,function(req,res){
    var user=req.body.username;
    User.find({username:user},function(err,user){
        if(err)
            console.log(err);
        else
            res.render("finduser",{user:user});
    });
    
});
router.get("/user/:userid",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.userid,function(err,user){
        if(err){
            console.log(err);
        }else{
            Post.find({name:user.username},function(err,foundPost){
                if(err){
                    console.log(err);
                }else{
                    if(user.username == req.user.username){
                        res.redirect("/profile");
                    }else{
                        res.render("user",{user:user,post:foundPost});
                    }
                }
            });
        }
    })

})

module.exports = router;