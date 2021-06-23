// all the admin/addProduct code goes here
const _ = require("lodash");
const _get = require(__dirname + "../../../../middleware/get");
const Products = require(__dirname + "../../../../model/Products");
const logger = require(__dirname + "../../../../middleware/logger");
const _bird = require(__dirname + "../../../../middleware/messageBird");
const cloudinary = require(__dirname + "../../../../config/cloudinary");

// cloudinary.v2.uploader.destory(public_id);



module.exports = {
    get(req, res) {
        try {
            res.render("admin/addProduct", {
                website: _get.Pages().website,
                name: _get.Pages().addProduct.name,
                breadcrumb: _get.Pages().addProduct.breadcrumb,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly
            });

        } catch (err) {
            console.error(":::::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct()
            });
        }
    },
    post: async function (req, res) {

        // console.log(req.body);
        try {
            let ctn = 0;
            // send the part of the files to cloudinary to upload
            req.files.forEach(file => {
                try {
                    cloudinary(file.path, (err, result) => {
                        if (err) {
                            console.log("::Err", err);
                            _bird.message("danger", err);
                            throw "Failed to upload images.";
                        }
                        _bird.message("success", "Successfully uploaded" + result.original_filename);
                        console.log(ctn, req.files.length - 1);
                        file.cloudinary = result;
                        logger.log("check", req.files);
                        if (ctn == req.files.length - 1) {
                            logger.log("okokokokokok");
                            createAndSave();
                        }
                        ctn++;
                    });
                } catch (err) {
                    _bird.message("danger", err);
                    console.log(":::err", err);
                    res.redirect("back");
                }
            });

            // console.log("::::::::::", req.body);

            function createAndSave() {
                logger.log("done ass");
                const newProduct = new Products({
                    name: _.toLower(req.body.name),
                    brand: _.toLower(req.body.brand),
                    img: req.files,
                    color: _.toLower(req.body.color),
                    category: _.toLower(req.body.category),
                    price: req.body.price,
                    description: req.body.description,
                    totalNo: req.body.totalNo
                });

                console.log(":::::created", req.files);
                logger.log("done senddding");
                newProduct.save((err) => {
                    if (err) {
                        console.log(":::::", err);
                        _bird.message("danger", err);
                        _bird.message("danger", "Could Not Add Product");
                        res.redirect("back");
                    }
                    else {
                        _bird.message("success", "Successfully Added New Product");
                        console.log("Added new product");
                        res.redirect("back");
                    }
                });
            }
        } catch (err) {
            console.error(":::::", err);
            _bird.message("danger", err);
            res.render("layouts/500", {
                website: _get.Pages().website,
                login: req.isAuthenticated(),
                user: req.user,
                bird: _bird.fly,
                name: `500 - Internal server error!`,
                breadcrumb: `❌🤦‍♂️`,
                product: _get.AllProduct()
            });
        }
    }
}