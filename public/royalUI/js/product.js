// here will contain all the product page JS

// delete product from product db
function deleteProduct(productId) {
	console.log("hey", productId);

	// I called this page from category.js[it shouldn't be there but whatevet~]
	// postAxios({ url: "/admin/products", _data: productId }, (err, res) => {
	// 	if (err) {
	// console.log(":::err", err);
	// messager({
	// 	replace: ["success", "danger"],
	// 	message: "Problem occured while deleting product! "
	// });
	// 		return;
	// 	}
	// 	else {
	// getAxios("/admin/products", (error, response) => {
	// 	if (err) {
	// 		console.log(":::err", err);
	// 		messager({
	// 			replace: ["success", "danger"],
	// 			message: "Please Refresh. Problem loading Pages."
	// 		});
	// 		return;
	// 	}
	// 	messager({
	// 		replace: ["danger", "success"],
	// 		message: "Product Deleted"
	// 	});
	// });
	// 	}
	// });

	deleteAxios("/admin/products?q=" + productId, (err, res) => {
		if (err) {
			console.log(":::err", err);
			messager({
				replace: ["success", "danger"],
				message: "Problem occured while deleting product! "
			});
		}
		else {
			console.log("my", res);
			getAxios("/admin/products", (err, response) => {
				if (err) {
					// console.log(":::err", err);
					messager({
						replace: ["success", "danger"],
						message: "Please Refresh. Problem loading Pages."
					});
					return;
				}
				messager({
					replace: ["danger", "success"],
					message: "Product Deleted"
				});
				closeModal();
			});
		}
	});
}
