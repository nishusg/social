var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    flash                 = require("connect-flash"),
    bodyParser            = require("body-parser"),
    methodOverride        = require("method-override"),
    LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");    

// models
var User                  = require("./models/user"),
    Posts                 = require("./models/post"),
    Comment               = require("./models/comment");
    Friend                = require("./models/friend"),
    SentRequest           = require("./models/sentRequest");

// routes
var indexRoutes           = require("./routes/index"),
    postRoutes            = require("./routes/post"),
    profileRoutes         = require("./routes/profile"),
    authRoutes            = require("./routes/auth"),
    commentRoutes         = require("./routes/comment"),
    finduserRoutes        = require("./routes/finduser");


mongoose.connect("mongodb://localhost/socialnetwork",{ useUnifiedTopology: true , useNewUrlParser: true });
var app = express();
app.set('view engine', 'ejs');

// express session for hash
app.use(require("express-session")({
    secret : "This is secret",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/style"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});

// passport User encode and decode the session
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use routes
app.use(indexRoutes);
app.use(postRoutes);
app.use(profileRoutes);
app.use(authRoutes);
app.use(finduserRoutes);
app.use(commentRoutes);


app.listen(3000, process.env.IP, function(){
    console.log("server started.......");
})