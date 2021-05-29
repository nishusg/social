var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport");
var router      = express.Router();
var User        = mongoose.model("User");
var Post        = mongoose.model("Post");
var middleware = require("../middleware");
router.get("/profile",middleware.isLoggedIn,function(req,res){
    User.findOne({username : req.user.username},function(err,user){
        if(err){
            console.log(err);
        }else{
            Post.find({name:req.user.username},function(err,posts){
                if(err){
                    console.log(err);
                }else{
                    res.render("profile",{user : user,post:posts,currentUser : req.user});
                }
            })

        }
    });
});
router.get("/editprofile",middleware.isLoggedIn,function(req,res){
    User.findOne({username : req.user.username},function(err,user){
        if(err){
            console.log(err);
        }else{
            res.render("editprofile",{user : user});
        }
    })
});
router.post("/editprofile",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var bio  = req.body.bio;
    var website = req.body.website;
    var newpr = { name:name,image:image,bio:bio,website:website};
    User.findByIdAndUpdate({_id : req.user._id},newpr,function(err,user){
        if(err){
            console.log(err);
        }else{
            req.flash("success","Successfully Updated Profile");
            res.redirect("/profile");
        }
    });
});
module.exports = router;
