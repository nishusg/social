var express     = require("express"),
    mongoose    = require("mongoose"),
    router      = express.Router();
var User        = mongoose.model("User");
var Blog        = mongoose.model("Blog");
var middleware  = require("../middleware");


router.get("/allblog",middleware.isLoggedIn,function(req,res){
    Blog.find({},function(err,blogs){
        if(err)
            console.log(err);
        else{
            res.render("findblog",{blog:blogs});
        } 
    });
});

router.get("/blog",middleware.isLoggedIn,function(req,res){
    res.render("blog");
});

router.post("/blog",middleware.isLoggedIn,function(req,res){
    User.findOne({username:req.user.username},function(err,user){
        if(err){
            console.log(err);
        }else{
            if(err){
                console.log(err);
            }else{
                var text = req.body.text;
                var newblog = {text:text};
                Blog.create(newblog,function(err,blog){
                    if(err)
                        console.log(err);
                    else
                        blog.user.id=req.user._id;
                        blog.user.username=req.user.username;
                        blog.name=req.user.username;
                        blog.save();
                        user.blogs.push(blog);
                        user.save();
                        req.flash("success","Successfully Added Blog")
                        res.redirect("/profile");     
                });
            }
        }
    });
});

router.get("/blog/:blogid",middleware.isLoggedIn,function(req,res){
    Blog.findOne({_id:req.params.blogid}).populate("comments").exec(function(err,foundBlog){
        if(err)
            console.log("err");
        else{
            res.render("showblog",{blog:foundBlog});
        }
    });
});


router.delete("/blog/:id",middleware.checkBlogOwner,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,blog){
        if(err)
            res.redirect("/profile");
        else
            req.user.blogs.pop(blog._id);
            req.user.save();
            req.flash("success","Successfully deleted Blog")
            res.redirect("/profile");
    });
});

module.exports = router;