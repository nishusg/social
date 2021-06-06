var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport");
var router      = express.Router();
var User        = mongoose.model("User");
var Post        = mongoose.model("Post");
var Comment     = mongoose.model("Comment");
var middleware = require("../middleware");
router.get("/",function(req,res){
    res.redirect("/login");
});
router.get("/find",middleware.isLoggedIn,function(req,res){
    Post.find({},function(err,posts){
        if(err)
            console.log(err);
        else{
            res.render("findpost",{post:posts});
        } 
    });
});

router.get("/friend",middleware.isLoggedIn,function(req,res){
    Friend.find({username:req.user.username},function(err,friend){
        if(err){
            console.log(err);
        }else{
            res.render("friend",{friend:friend});
        }
    })
});

router.get("/home",middleware.isLoggedIn,function(req,res){
    res.render("home");
});


module.exports = router;