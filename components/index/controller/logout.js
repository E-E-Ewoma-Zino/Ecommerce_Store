// all the 404 errors route code goes here

const _bird = require("../../../middleware/messageBird");


module.exports = (req, res)=>{
    req.logOut();
    _bird.message("primary", "Bye 😥");
    res.redirect("/");
}