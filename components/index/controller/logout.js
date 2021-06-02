// all the 404 errors route code goes here


module.exports = (req, res)=>{
    req.logOut()
    res.redirect("/");
}