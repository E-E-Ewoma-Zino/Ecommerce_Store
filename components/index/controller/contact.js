// all the contact route code goes here
const _get = require(__dirname + "../../../../middleware/get");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


module.exports = (req, res)=>{
    try {
        res.render("layouts/contact", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
bird: _bird.fly,
            name: _get.Pages().contact.name,
            breadcrumb: _get.Pages().contact.breadcrumb,
            contact: _get.Pages().contact.contact
        });

    
         } catch (err) {
        console.error(":::", err);
        _bird.message("danger", err);
res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
bird: _bird.fly,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            
        });
    }
}