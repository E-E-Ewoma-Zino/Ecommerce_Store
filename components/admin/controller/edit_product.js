// all the product edition dashboard route code goes here
// this route is for editing individual product
const _ = require("lodash");
const _get = require(__dirname + "../../../../middleware/get");
const Products = require(__dirname + "../../../../model/Products");
const logger = require(__dirname + "../../../../middleware/logger");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");

module.exports = {
	get(req, res) {
		try {
			console.log(req.query);
			// update the page by removing the deleted images
			// if(req.query.removeImage) removeImage(req.params.productId, req.query.removeImage);

			_get.ProductByID(req.params.productId, (product) => {
				// for easy data transfer
				res.render("admin/editProduct", {
					bird: _bird.fly,
					product: product
				});
			});
		} catch (err) {
			_bird.message("danger", err);
			console.error(":::", err);
			error500(req, res);
		}
	},
	post(req, res) {
		try {
			logger.log(req.params);
			logger.log(req.files);
			logger.log(req.body);
			const newData = {
				// img: req.files,
				price: req.body.price,
				totalNo: req.body.totalNo,
				brand: _.toLower(req.body.brand),
				color: _.toLower(req.body.color),
				name: _.toLower(req.body.name[0]),
				description: req.body.description,
				// categories: JSON.parse(req.body.category)
			};
			
			// this updates the image with the new one. NOTE it does not delete
			if(req.files.length) updateImage(req.params.productId, req.files, (sent)=>{
				if (sent) {
					console.log("Image Updated");
					_bird.message("success", "Updated");
				}else{
					_bird.message("danger", "Image not updated");
				}
			});

			// updates the normal data in the product eg name , price etc...
			updateById(req.params.productId, newData, (done)=>{
				if(done){
					_bird.message("success", "Updated");
					res.redirect("back");
				}else{
					_bird.message("danger", "Not updated");
					res.redirect("back");
				}
			});
		} catch (err) {
			console.error(":::", err);
			_bird.message("danger", err);
			error500(req, res);
		}
	}
}

// TODO: make function to add image and remove images. Hint they will be individual functions
function updateImage(productId, data, callback) {
	Products.findOne({_id: productId}, (err, product)=>{
		if (err) {
			console.log("err:::", err);
		}
		else{
			product.img = [...product.img, ...data];
			product.save((err)=>{
				if (err) {
					console.log("err:::", err);
					_bird.message("danger", err);
					callback(false);
				}
				else{
					console.log("Image Updated");
					_bird.message("success", "Image Updated");
					callback(true);
				}
			});
		}
	});
}

function removeImage(productId, imgIndex) {
	Products.deleteOne({_id: productId}, {img: {$pull: {imgIndex}}}, (err)=>{
		if (err) {
			console.log("err:::", err);
		}else{
			console.log("Delete Successful");
		}
	});
}
// TODO: make function to add, remove a category from the product category list. Note it should 
// 1. Be able to know if that ner category list cantains an old category id
// 2. Be able to add only the new category id in the category list
// 3. Be able to delete if neccessary the category that is missing from the comperism between the old and new category list
// Hint: You will have to compare both the old and the new category list to know how to update it


// Update Products by id
function updateById (productId, newData, callback){
	Products.updateOne({_id: productId}, newData, (err)=>{
		if (err) {
			console.log("::::Erro", err);
			callback(false);
		}
		else{
			console.log("Finished Updating");
			callback(true);
		}
	});
}