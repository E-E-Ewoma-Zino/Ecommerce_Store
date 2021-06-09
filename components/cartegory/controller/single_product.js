// all the category/: code goes here
const _get = require(__dirname + "../../../../middleware/get");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const cart = require(__dirname + "../../../../middleware/cart_DB");

module.exports = (req, res)=>{
    
    _get.ProductByID(req.params.id, (product) => {
        try{
            res.render("layouts/Single-product", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
            user: req.user,
bird: _bird.fly,
                name: _get.Pages().single.name,
                breadcrumb: _get.Pages().single.breadcrumb,
                product: product
            });
        }catch(err) {
            console.error(":::::", err);
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
    });
}