// all the contact route code goes here
const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");


module.exports = (req, res)=>{
    try {
        res.render("layouts/contact", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
message: messageBird.fly,
            name: _get.Pages().contact.name,
            breadcrumb: _get.Pages().contact.breadcrumb,
            contact: _get.Pages().contact.contact
        });

    } catch (err) {
        console.error(":::", err);
        res.render("layouts/500", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
message: messageBird.fly,
            name: `500 - Internal server error!`,
            breadcrumb: `❌🤦‍♂️`,
            product: _get.AllProduct(),
            msg: err
        });
    }
}