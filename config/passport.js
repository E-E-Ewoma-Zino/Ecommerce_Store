// configure passport
const LocalStrategy = require("passport-local").Strategy;
const Users = require(__dirname + "../../model/Users");


module.exports = (passport) => {
    passport.use(Users.createStrategy());
    // THIS WAS WHAT I USE IN FIXING THE PASSPORT AUTHENTICATION ISSUE
    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, Users.authenticate()));

    passport.serializeUser(Users.serializeUser());
    passport.deserializeUser(Users.deserializeUser());
}