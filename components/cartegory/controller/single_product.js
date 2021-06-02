// all the category/: code goes here
const _get = require("../../../middleware/get");
const messageBird = require("../../../middleware/messageBird");
const cart = require("../../../middleware/cart_DBc");

module.exports = (req, res)=>{
    
    _get.ProductByID(req.params.id, (product) => {
        try{
            res.render("layouts/Single-product", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
            user: req.user,
message: messageBird.fly,
                name: _get.Pages().single.name,
                breadcrumb: _get.Pages().single.breadcrumb,
                product: product
            });
        }catch(err) {
            console.error(":::::", err);
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
    });
}