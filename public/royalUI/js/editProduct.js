// code for the edit  
// Most of the variables are from the category.js



// TODO: 
// 1. occupie inputs with the appoprate data 
// 2. in the category input get all the category from the product and check it as selected
const productCategories = document.getElementById("productCategory");

getAxios("/admin/categoryAPI", (err, data) => {
	if (err) {
		console.log(":::", err);
		messager({
			replace: ["success", "danger"],
			message: "Please Refresh. Problem loading Pages."
		});
		return;
	}
	// console.log("res::: ", res.data);
	// send in data or if data is undefine send in an empty array
	// Get the categories to be selected
	// to store the selected values
	const selected = getTheSelectedCaregory(data, productCategories.value.split(','));
	checkTheCategoryThatAreContainedInTheProduct(selected);
});

// Get the categories to be selected down and tbeir list value
function getTheSelectedCaregory(allCategory, productCategories) {
	// selected is the caregories in the productCaregory that needs to be selected
	// the list value will correspond to the caregories, and it will help in finding the class value in the dom
	const selected = {
		categories: [],
		listValue: []
	};
	allCategory.forEach((category, index) => {
		productCategories.forEach(productCaregory => {
			if (category._id === productCaregory) {
				selected.categories.push(category);
				selected.listValue.push(index);
			}
		});
	});
	return selected;
}
// 3. since the cateogories are checked then the categories should show in the category input
function checkTheCategoryThatAreContainedInTheProduct(data) {
	// for each category in the data check the list that links to that category
	// and push them to the myCategory object
	for (let i = 0; i < data.listValue.length; i++) {
		for (let j = 0; j < children.length; j++) {
			const child = children[j];
			if (child.children[1].value == data.categories[i]._id) {
				// console.log(child.children[1].value);
				// console.log(data.categories[i]._id);
				child.firstElementChild.firstElementChild.checked = true;
				// console.log(child.firstElementChild.firstElementChild.checked);
				myCategory.id.push(data.categories[i]._id);
				myCategory.names.push(data.categories[i].name);
				// console.log(child);
				// console.log(myCategory);
			}
		}
	}
	// display it
	formCategoryName.value = myCategory.names.toString();
	formCategoryId.value = JSON.stringify(myCategory.id);
}
// 4. make sure that if an old category is selected then it should not be sent again[Ok this part will be done in the server side]


// Function to remove an image from a product
// Get req that has a query
// this function recieves an index from the delete btn and uses that index to know where to delete the image
function removeImage(btn, index) {

	// axios.get(hostURL + window.location.pathname + window.location.search + "&removeImage=" + index).then((res) => {
	// // using a callback to get the resposne asyncronously
	// // console.log(res.data);
	// messager({
	// 	replace: ["danger", "success"],
	// 	message: "Delete Successful."
	// });

	// document.getElementsByClassName("img-content")[index].style.filter = "sepia(1)";
	// btn.style.display = "none";
	// }).catch((err) => {
	// 	console.log(":::ERr ", err);
	// 	messager({
	// 		replace: ["success", "danger"],
	// 		message: "Delete Failed. Try again."
	// 	});
	// });
	getAxios(window.location.pathname + window.location.search + "&removeImage=" + index, (err, res) => {
		if (err) {
			console.log(":::err", err);
			messager({
				replace: ["success", "danger"],
				message: "Delete Failed. Try again."
			});
			return;
		}
		// using a callback to get the resposne asyncronously
		// console.log(res.data);
		messager({
			replace: ["danger", "success"],
			message: "Delete Successful."
		});

		document.getElementsByClassName("img-content")[index].style.filter = "sepia(1)";
		btn.style.display = "none";
	});
}