// all the category route code goes here
const _get = require("../../../middleware/get");
const search = require("../../../middleware/search");
const logger = require("../../../middleware/logger");
const messageBird = require("../../../middleware/messageBird");


module.exports = {
    get(req, res) {
        let product;

        messageBird.message("success", "I am a really big boy");
        logger.log(messageBird.fly);

        console.log(req.user);
        try {
            switch (req.query.type) {
                case "name":
                    search.name(req.query.q, (result) => {
                        product = result;
                        res.render("layouts/category", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            message: messageBird.fly,
                            name: _get.Pages().category.name,
                            breadcrumb: _get.Pages().category.breadcrumb,
                            products: product,
                            categories: _get.AllCategory(),
                            colors: _get.AllColor(),
                            brands: _get.AllBrand()
                        });
                    });
                    break;
                case "color":
                    search.color(req.query.q, (result) => {
                        product = result;
                        res.render("layouts/category", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            message: messageBird.fly,
                            name: _get.Pages().category.name,
                            breadcrumb: _get.Pages().category.breadcrumb,
                            products: product,
                            categories: _get.AllCategory(),
                            colors: _get.AllColor(),
                            brands: _get.AllBrand()
                        });
                    });
                    break;
                case "brand":
                    search.brand(req.query.q, (result) => {
                        product = result;
                        res.render("layouts/category", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            message: messageBird.fly,
                            name: _get.Pages().category.name,
                            breadcrumb: _get.Pages().category.breadcrumb,
                            products: product,
                            categories: _get.AllCategory(),
                            colors: _get.AllColor(),
                            brands: _get.AllBrand()
                        });
                    });
                    break;
                case "category":
                    search.category(req.query.q, (result) => {
                        product = result;
                        res.render("layouts/category", {
                            website: _get.Pages().website,
                            login: req.isAuthenticated(),
                            user: req.user,
                            message: messageBird.fly,
                            name: _get.Pages().category.name,
                            breadcrumb: _get.Pages().category.breadcrumb,
                            products: product,
                            categories: _get.AllCategory(),
                            colors: _get.AllColor(),
                            brands: _get.AllBrand()
                        });
                    });
                    break;
                default:
                    product = _get.AllProduct();
                    res.render("layouts/category", {
                        website: _get.Pages().website,
                        login: req.isAuthenticated(),
                        user: req.user,
                        message: messageBird.fly,
                        name: _get.Pages().category.name,
                        breadcrumb: _get.Pages().category.breadcrumb,
                        products: product,
                        categories: _get.AllCategory(),
                        colors: _get.AllColor(),
                        brands: _get.AllBrand()
                    });
                    break;
            }
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
    },
    post(req, res) {
        const searchTerm = req.body.search;
        console.log(searchTerm);
        let allSearch = [];

        try {
            search.name(searchTerm, (result) => {
                // console.log("my log" + search.color(searchTerm));
                // console.log("::The result is::" + result);
                result.forEach(ele => {
                    allSearch.push(ele);
                });
            });
            search.color(searchTerm, (result) => {
                // console.log("::The result is::" + result);
                result.forEach(ele => {
                    allSearch.push(ele);
                });
            });
            search.brand(searchTerm, (result) => {
                // console.log("::The result is::" + result);
                result.forEach(ele => {
                    allSearch.push(ele);
                });
            });
            search.category(searchTerm, (result) => {
                // console.log("::The result is::" + result);
                result.forEach(ele => {
                    allSearch.push(ele);
                });
                console.log(allSearch);
                res.render("layouts/category", {
                    website: _get.Pages().website,
                    login: req.isAuthenticated(),
                    user: req.user,
                    message: messageBird.fly,
                    name: _get.Pages().category.name,
                    breadcrumb: _get.Pages().category.breadcrumb,
                    products: allSearch,
                    categories: _get.AllCategory(),
                    search: searchTerm,
                    colors: _get.AllColor(),
                    brands: _get.AllBrand()
                });
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
}