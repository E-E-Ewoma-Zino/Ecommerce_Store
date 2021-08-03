// get the Category
const Category = require(__dirname + "../../model/Category");
const mongoose = require("mongoose");

module.exports = {
	All: (callback) => {
		Category.find({}).exec((err, cat) => {
			if (err) {
				console.log(err);
				callback(err, null);
			}
			else {
				callback(null, cat);
			}
		});
	},
	ById: (id, callback) => {
		Category.findById({ _id: id }).exec((err, cat) => {
			if (err) {
				console.log(err);
				callback(err, null);
			}
			else {
				callback(null, cat);
			}
		});
	},
	// finds and add a child's id to the parent
	newChild(child) {
		this.ById(child.parents, (err, parent) => {
			if (err) {
				console.log(err);
			}
			else {
				parent.children.push(child);
				parent.save();
			}
		});
	},
	// finds and add all the parents to the child
	newParent(child, callback) {
		this.ById(child.parents, (err, parent) => {
			if (err) {
				console.log(err);
			}
			else {
				if (parent.parents.length) {
					console.log("Has Parent", parent.parents);
					child.parents = [child.parents, ...parent.parents];
					console.log("New", child.parents);
				}
				else {
					console.log("No Parent");
				}
			}
			// console.log("New", newCategory.parent);
			child.save((err) => {
				if (err) {
					console.log(err);
				}
				else {
					callback(null);
				}
			});
		});
	},
	// Arrange the array in acending order and populate the parent with the name
	sortAndPopulate(callback) {
		this.All((err, all) => {
			if (!all.length) {
				callback(null, []);
				return;
			}
			populate(all, (err, family) => {
				callback(null, sort(family));
			});
		})
		// cb(null, sort(adams));

	},
	// Add product to category
	addProduct(productID, categoryList) {
		categoryList.forEach(category => {
			this.ById(mongoose.Types.ObjectId(category), (err, cat) => {
				if (err) {
					console.log(err);
				}
				else {
					cat.products.push(productID);
					cat.save();
				}
			})
		});
	},
	// delete a category
	deleteOne: (categoryId, callback) => {
		Category.deleteOne({ _id: categoryId }, (err) => {
			if (err) {
				console.log("err:::", err);
				callback(err, null);
				return;
			}
			callback(null, true);
		});
	}
}


// sort aphabetically
function sort(arr) {
	let temp;
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			// console.log(arr.length, j, arr[j].name, arr[j + 1].name);
			if (arr[j].name > arr[j + 1].name) {
				temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			} else {
				// console.log("next");
			}
		}
	}

	return arr;
}

// populate all
function populate(list, cb) {
	let family = [];

	for (let i = 0; i < list.length; i++) {
		const parent = list[i];
		Category.findById({ _id: parent._id }).populate({ path: "parents children products", select: ["name"] }).exec((err, child) => {
			if (err) {
				console.log(err);
				cb(err, null);
			} else {
				family.push(child);
				if (i == list.length - 1) {
					cb(null, family);
				}
			}
		});
	}
}