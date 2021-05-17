require("dotenv").config({path: "./config/config.env"});
const methodOveride = require("method-override");
const session = require("express-session");
const connectDB =  require("./config/db");
const passport = require("passport");
const express = require("express");
const path = require("path");

const app = express();

// Configure the DB
connectDB();

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

// @route
// home
app.use("/", require("./routes/index"));
// category
app.use("/category", require("./routes/category"));
// admin
app.use("/admin", require("./routes/admin"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));