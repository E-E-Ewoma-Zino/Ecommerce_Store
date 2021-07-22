// all the product edition dashboard route code goes here
// this route is for editing individual product
const _ = require("lodash");
const _get = require(__dirname + "../../../../middleware/get");
const Products = require(__dirname + "../../../../model/Products");
const logger = require(__dirname + "../../../../middleware/logger");
const error500 = require(__dirname + "../../../error/controller/500");
const _bird = require(__dirname + "../../../../middleware/messageBird");


function renderGet(res, bird, product) {
	res.render("admin/editProduct", {
		bird: bird.fly,
		product: product
	});
}
module.exports = {
	get(req, res) {
		try {
			console.log(req.query);
			// update the page by removing the deleted images
			if (req.query.removeImage) removeImage(req.params.productId, req.query.removeImage, (err, done) => {
				if (err) _get.ProductByID(req.params.productId, (product) => {
					// for easy data transfer
					_bird.message("warning", "Please Refresh to see changes.");
					renderGet(res, _bird, product);
					return;
				});
			});

			_get.ProductByID(req.params.productId, (product) => {
				// for easy data transfer
				renderGet(res, _bird, product);
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
			if (req.files.length) updateImage(req.params.productId, req.files, (sent) => {
				if (sent) {
					console.log("Image Updated");
					_bird.message("success", "Updated");
				} else {
					_bird.message("danger", "Image not updated");
				}
			});

			// update the categories
			// get all the new categories
			getNewCategories(req.params.productId, req.body.category, (newCategories)=>{
				// not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				addTheNewCategories(req.params.productId, newCategories, (done)=>{
					if(done) _bird.message("success", "Category Updated");
				});
			});
			// if any category is removed from the list delete it
			removeDeletedCategories(req.params.productId, req.body.category, (answer) => {
				logger.log("ans", answer);
			});

			// updates the normal data in the product eg name , price etc...
			updateById(req.params.productId, newData, (done) => {
				if (done) {
					_bird.message("success", "Updated");
					res.redirect("back");
				} else {
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
	Products.findOne({ _id: productId }, (err, product) => {
		if (err) {
			console.log("err:::", err);
		}
		else {
			product.img = [...product.img, ...data];
			product.save((err) => {
				if (err) {
					console.log("err:::", err);
					_bird.message("danger", err);
					callback(false);
				}
				else {
					console.log("Image Updated");
					_bird.message("success", "Image Updated");
					callback(true);
				}
			});
		}
	});
}

function removeImage(productId, imgIndex, callback) {
	Products.findById({ _id: productId }, (err, product) => {
		if (err) {
			console.log("err:::", err);
			callback(err, null);
		} else {
			product.img.splice(imgIndex, 1);
			product.save((err) => {
				if (err) {
					console.log(err);
					_bird.message("danger", "Could not delete image " + imgIndex);
				}
				else {
					console.log("Delete Successful");
					_bird.message("success", "Successfully Deleted Image " + imgIndex);
					callback(null, true);
				}
			});
		}
	});
}
// TODO: make function to add, remove a category from the product category list. Note it should 
// 1. Be able to know if that new category list cantains an old category id
function getNewCategories(productId, newCategories, callback) {
	const onlyNew = [];
	_get.ProductByID(productId, (product) => {
		for (let i = 0; i < JSON.parse(newCategories).length; i++) {
			const newCategory = JSON.parse(newCategories)[i];
			for (let j = 0; j < product.categories.length; j++) {
				const category = product.categories[j];
				if (newCategory == category) {
					break;
				}
				else {
					if (product.categories.length - 1 == j) {

						onlyNew.push(newCategory);
					}
				}
			}
		}
		callback(onlyNew);
	});
}
// 2. Be able to add only the new category id in the category list
function addTheNewCategories(productId, categories, callback) {
	logger.log("categories");
	logger.log(categories);
	_get.ProductByID(productId, (product) => {
		if (product) {
			product.categories = [product.categories, ...categories];
			product.save((err)=>{
				if(err){
					console.log("err:::", err);
					_bird.message("danger", "Category Failed to Update New!");
					callback(false);
				}else{
					callback(true);
				}
			});
		} else callback(false);
	});
}
// 3. Be able to delete if neccessary the category that is missing from the comperism between the old and new category list
// Hint: You will have to compare both the old and the new category list to know how to update it
function removeDeletedCategories(productId, newCategories, callback) {
	const missing = [];
	_get.ProductByID(productId, (product) => {
		// if the newCategories is empty then delete all category, because the is no category to add or that will remain
		if(!JSON.parse(newCategories).length) product.categories = [];
		// eles remove only the categories that were deleted
		else for (let j = 0; j < product.categories.length; j++) {
			const category = product.categories[j];
			for (let i = 0; i < JSON.parse(newCategories).length; i++) {
				const newCategory = JSON.parse(newCategories)[i];
				// logger.log(category, "is = ", newCategory);
				if (category == newCategory) {
					break;
				}
				else {
					if (JSON.parse(newCategories).length - 1 == i) {
						missing.push(category);
						product.categories.splice(product.categories.indexOf(category), 1);
					}
				}
			}
		}
		product.save((err)=>{
			if(err){
				console.log("err:::", err);
				_bird.message("danger", "Category Failed to Update!");
			}else{
				callback(missing);
			}
		});
	});
}


// Update Products by id
function updateById(productId, newData, callback) {
	Products.updateOne({ _id: productId }, newData, (err) => {
		if (err) {
			console.log("::::Erro", err);
			callback(false);
		}
		else {
			console.log("Finished Updating");
			callback(true);
		}
	});
}