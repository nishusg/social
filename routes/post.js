var express     = require("express"),
    mongoose    = require("mongoose"),
    passport    = require("passport");
var router      = express.Router();
var User        = mongoose.model("User");
var Post        = mongoose.model("Post");
var middleware  = require("../middleware");
var multer      = require('multer');
var path        = require("path");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
   
var upload = multer({ storage: storage }).single('image');

router.get("/post",middleware.isLoggedIn,function(req,res){
    res.render("post");
});
router.post("/post",middleware.isLoggedIn,function(req,res){
    User.findOne({username:req.user.username},function(err,user){
        if(err){
            console.log(err);
        }else{
            upload(req,res,function(err){
                if(err){
                    console.log(err);
                }else{
                    var title = req.body.title;
                    var image = req.file.filename;
                    var desc  = req.body.description;
                    var newpost = {title:title,image:image,description:desc};
                    Post.create(newpost,function(err,post){
                        if(err)
                            console.log(err);
                        else
                            post.user.id=req.user._id;
                            post.user.username=req.user.username;
                            post.name=req.user.username;
                            post.save();
                            user.posts.push(post);
                            user.save();
                            req.flash("success","Successfully Added Post")
                            res.redirect("/profile");     
                    });
                }
            });
        }
    });
});
router.get("/post/:id",middleware.isLoggedIn,function(req,res){
    Post.findById(req.params.id).populate("comments").exec(function(err,foundPost){
        if(err)
            console.log(err);
        else{
            res.render("showpost",{post:foundPost});
        }
    });
});

router.get("/post/:id/edit",middleware.checkPostOwner,function(req,res){
    Post.findById(req.params.id,function(err,foundPost){
        res.render("editpost",{post:foundPost});
    });
});

router.put("/post/:id",middleware.checkPostOwner,function(req,res){
    var data={title:req.body.title,image:req.body.image,description:req.body.description};
    Post.findByIdAndUpdate(req.params.id,data,function(err){
        if(err)
            res.redirect("/post");
        else
            req.flash("success","Successfully Edit Post")
            res.redirect("/post/"+req.params.id);
    });
});

router.delete("/post/:id",middleware.checkPostOwner,function(req,res){
    Post.findByIdAndRemove(req.params.id,function(err,post){
        if(err)
            res.redirect("/profile");
        else
            req.user.posts.pop(post._id);
            req.user.save();
            req.flash("success","Successfully deleted Post")
            res.redirect("/profile");
    });
});

module.exports = router;