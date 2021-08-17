// code for the edit  
// Most of the variables are from the category.js



// TODO: 
// 1. occupie inputs with the appoprate data 
// 2. in the category input get all the category from the product and check it as selected
const productCategories = document.getElementById("productCategory");

prepareCategoryList((data) => {
	// console.log("res::: ", res.data);
	// Get the categories to be selected and store the selected values
	getTheSelectedCaregory(data, productCategories.value.split(','));
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

	checkTheCategoryThatAreContainedInTheProduct(selected);
}

// 3. since the cateogories are checked then the categories should show in the category input
function checkTheCategoryThatAreContainedInTheProduct(data) {
	// get the list_of_category then if clicked, update it with the value
	const li_list_of_categories = document.getElementsByClassName("list_of_categories");

	// for each category in the data check the list that links to that category
	// and push them to the myCategory object
	for (let i = 0; i < data.listValue.length; i++) {
		console.log("lnt", li_list_of_categories.length);
		// li_list_of_categories are all the list of categories listed to be selected from the edit category page
		for (let j = 0; j < li_list_of_categories.length; j++) {
			const child = li_list_of_categories[j];
			// console.log(child.children[1].value, " = ", data.categories[i]._id);
			if (child.children[1].value == data.categories[i]._id) {
				// console.log(child.children[1].value);
				// console.log(data.categories[i]._id);
				child.firstElementChild.firstElementChild.checked = true;
				child.firstElementChild.firstElementChild.nextElementSibling.classList.add("ti-check");
				child.firstElementChild.firstElementChild.nextElementSibling.classList.toggle("text-success");
				child.firstElementChild.firstElementChild.nextElementSibling.classList.remove("ti-control-record");
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

console.log("PPP", productCategories.value);