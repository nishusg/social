var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport");
var router      = express.Router();
var User        = mongoose.model("User");
var Post        = mongoose.model("Post");
var Friend     = mongoose.model("Friend");
var middleware = require("../middleware");
router.get("/",function(req,res){
    res.redirect("/login");
});

router.get("/message",middleware.isLoggedIn,function(req,res){
    res.send("This routes is under construction");
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
    res.redirect("/explore");
});


module.exports = router;