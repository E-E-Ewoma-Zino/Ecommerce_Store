require("dotenv").config({path: "./config/config.env"});
const methodOveride = require("method-override");
const session = require("express-session");
const connectDB =  require("./config/db");
const passportLocalMongoose = require("passport-local-mongoose");
const Users = require("./model/Users")(passportLocalMongoose);
const passport = require("passport");
const express = require("express");
const path = require("path");

const app = express();


// app configs
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOveride((req, res)=>{
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // looks in url post bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}));

// tell app to use express session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));


// passport config
app.use(passport.initialize());
app.use(passport.session());

// Configure the DB
connectDB();

passport.use(Users.createStrategy());

passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
// @route
// home
app.use("/", require("./routes/index"));
// category
app.use("/category", require("./routes/category"));
// admin
app.use("/admin", require("./routes/admin"));

// @desc    Checkout page
// @route   POST /signup
// app.post("/signup", (req, res, next)=>{
//     Users.register({username: req.body.email}, req.body.password, (err, user)=>{
//         if (err) {
//             console.log(":::::::::::::::: " + err);
//             res.redirect("/register");
//         }
//         else{
//             passport.authenticate("local", function(err, user, info) {

//                 if (err) return next(err); 
//                 if (!user) return res.redirect('/login'); 
            
//                 req.logIn(user, function(err) {
//                     if (err)  return next(err); 
//                     return res.redirect("/account/profile");
//                 });
            
//             })(req, res, next);
//         }
//     });
// });


app.post("/signup", function (req, res, next) {
    Users.register({
        username: req.body.email
    }, req.body.password, function (err, user) {
        if (err) {
            return res.render('account/signup');
        }
        // go to the next middleware
        next();

    });
}, passport.authenticate('local', { 
    successRedirect: '/account/profile',
    failureRedirect: '/login' 
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));