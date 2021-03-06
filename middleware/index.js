var Post = require("../models/post");
var Blog = require("../models/blog");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkPostOwner= function(req, res, next) {
 if(req.isAuthenticated()){
        Post.findById(req.params.id,function(err,foundPost){
           if(err){
               req.flash("error", "Post not found");
               res.redirect("back");
           }  else {
            if(foundPost.user.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkBlogOwner= function(req, res, next) {
    if(req.isAuthenticated()){
           Blog.findById(req.params.id,function(err,foundBlog){
              if(err){
                  req.flash("error", "Blog not found");
                  res.redirect("back");
              }  else {
               if(foundBlog.user.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
              }
           });
       } else {
           req.flash("error", "You need to be logged in to do that");
           res.redirect("back");
       }
   }

middlewareObj.checkCommentOwner = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
           if(err){
               res.redirect("back");
           }  else {
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;