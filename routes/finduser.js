var express          = require("express"),
    mongoose         = require("mongoose"),
    passport         = require("passport");
var router           = express.Router();
var User             = mongoose.model("User");
var Friend           = mongoose.model("Friend");
var SentRequest      = mongoose.model("SentRequest");
var Post             = mongoose.model("Post");
var middleware       = require("../middleware");
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
            console.log("err");
        }else{
            Post.find({name:user.username},function(err,foundPost){
                if(err){
                    console.log(err);
                }else{
                    SentRequest.findOne({rusername:user.username,susername:req.user.username},function(err,request){
                        console.log(request);
                        if(err){
                            console.log("err");
                        }else{
                            if(request== null){
                                SentRequest.findOne({susername:user.username,rusername:req.user.username},function(err,request){
                                    console.log(request);
                                    if(user.username == req.user.username){
                                        res.redirect("/profile");
                                    }else if(request.susername==req.user.username && request.rusername == user.username){
                                        res.render("user",{user:user,post:foundPost,status:request.sstatus});
                                    }else if(request.susername==user.username && request.rusername == req.user.username){
                                        res.render("user",{user:user,post:foundPost,status:request.rstatus});
                                    }else{
                                        status = 0;
                                        res.render("user",{user:user,post:foundPost,status:status});
                                    }
                                });
                            }else{
                                if(user.username == req.user.username){
                                    res.redirect("/profile");
                                }else if(request.susername==req.user.username && request.rusername == user.username){
                                    res.render("user",{user:user,post:foundPost,status:request.sstatus});
                                }else if(request.susername==user.username && request.rusername == req.user.username){
                                    res.render("user",{user:user,post:foundPost,status:request.rstatus});
                                }else{
                                    status = 0;
                                    res.render("user",{user:user,post:foundPost,status:status});
                                }
                            }
                        }
                    })                    
                }
            });
        }
    })
})

router.post("/user/:userid",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.userid,function(err,user){
        if(err){
            console.log("err");
        }else{
            rusername = user.username;
            var request ={rusername:rusername}
            SentRequest.create(request,function(err,requestsent){
                if(err){
                    console.log(err);
                }else{
                    requestsent.sstatus = 2;
                    requestsent.rstatus = 1;
                    requestsent.susername = req.user.username;
                    requestsent.sender.id     = req.user._id;
                    requestsent.reciever.id   = user._id;
                    requestsent.save();
                    req.user.sentrequest.push(requestsent);
                    req.flash('success','Friend Request Sent Successfully');
                    res.redirect("/finduser");
                }
            });
        }
    })
    
});

router.get("/request",middleware.isLoggedIn,function(req,res){
    SentRequest.find({rusername:req.user.username},function(err,request){
        if(err){
            console.log("err");
        }else{
            res.render("request",{request:request});
        }
    })
})

router.post("/decline",middleware.isLoggedIn,function(req,res){
    User.find({username:req.user.username},function(err,user){
        if(err){
            console.log(err);
        }else{
            
        }
    });
});
module.exports = router;