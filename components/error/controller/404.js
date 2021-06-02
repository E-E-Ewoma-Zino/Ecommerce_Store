// all the 404 errors route code goes here

const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");


module.exports = (req, res)=>{
    try {
        res.render("layouts/404", {
            website: _get.Pages().website,
            login: req.isAuthenticated(),
            user: req.user,
message: messageBird.fly,
            name: `404 - Can't find "${req.originalUrl}"`,
            breadcrumb: `home - ❓`,
            product: _get.AllProduct()
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
