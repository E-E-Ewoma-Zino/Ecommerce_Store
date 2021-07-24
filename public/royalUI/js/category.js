// 

getAxios("/admin/category", (err, data) => {
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
	displayCategory(data || []);
});


// get the newCategory data and post to the server
const newCategory = document.getElementById("newCategory");
function createNewCategory() {
	let data = {
		name: newCategory.value,
		parent: childValue.id
	}
	console.log("new");

	if (data.name) postAxios({ url: "/admin/category", _data: data }, (error, response) => {
		if (error) {
			console.log(":::", err);
			messager({
				replace: ["success", "danger"],
				message: "Task Failed!"
			});
			return;
		}
		else {
			getAxios("/admin/category", (err, data) => {
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
				displayCategory(data || []);
			});
			messager({
				replace: ["danger", "success"],
				message: "Category has been added"
			});
		}
	});
	else messager({
		replace: ["success", "danger"],
		message: "Category has no name"
	});
}

// get the children then if clicked update it with the value
const parentInputName = document.getElementById("inputParentName");
const parentInputId = document.getElementById("inputParentId");
const children = document.getElementsByClassName("children");
// This is use to get both the name and the id of the categories the will be sent to the server
const formCategoryName = document.getElementById("formCategoryName");
const formCategoryId = document.getElementById("formCategoryId");

let childValue = {};
// when parent section is true the function for the list of categories will only change the parent section
let parentSection = false;

// empty childValue
function empty() {
	parentInputName.value = "";
	parentInputId.value = "";
	newCategory.value = "";
	myCategory.id = [];
	myCategory.names = [];
	formCategoryName.value = "";
}

// print categories
function displayCategory(category) {
	if (!category) {
		console.log("Category is empty");
		return;
	}
	let body = `<ul class="list-group">`;
	category.forEach(cat => {
		body += `<li class="children list-group-item list-group-item-action d-flex justify-content-between align-items-center">
		<div class="">
		<!-- This check box is just to check if the category is checked or not easily and it also holds the category id -->
			<input type="checkbox" id="${cat._id}" hidden/>
			<i class="ti-control-record"></i>
			${cat.parents.length ? ` <i class="tool-tip cursor-pointer ti-more" gloss="${cat.parents.slice().reverse().map(parent => parent.name + " ")}"></i> ` + cat.parents[0].name + ` <i class="ti-arrow-circle-right"></i> ` : ""}
			<strong>${cat.name}</strong>
		</div>
		<input type="hidden" name="id" value="${cat._id}">
		<input type="hidden" name="id" value="${cat.name}">
		<span class="tool-tip tool-tip-left badge badge-primary badge-pill" gloss="${cat.name} has ${cat.products.length} ${cat.products.length > 1 ? "products" : "product"}">
		${cat.products.length}
		</span>
	</li>`;
	});
	body += `</ul>`;
	document.getElementById("categoryBody").innerHTML = body;

	onCategoryClick(children);
}

// If a category in the listis clicked activate this function
function onCategoryClick(children) {
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		child.addEventListener("click", () => {

			if (parentSection) {
				// get name and id of the clicked element and put it in parent Input
				// console.log(child.children[1].value);
				childValue.id = child.children[1].value;
				// console.log(child.children[2].value);
				childValue.name = child.children[2].value;

				parentInputName.value = "Parent -> " + childValue.name;
				parentInputId.value = childValue.id;

				// activate checkbox
			} else {
				addToCategory(child.firstElementChild.firstElementChild, child.children[2].value);
				formCategoryName.value = myCategory.names.toString();
				formCategoryId.value = JSON.stringify(myCategory.id);
			}

		});
	}
}

// stores the added category id's and names
const myCategory = {
	id: [],
	names: []
};

// add or remove a product to a list of category
function addToCategory(child, name) {
	if (child.checked) {
		child.checked = false;
		child.nextElementSibling.classList.remove("ti-check");
		child.nextElementSibling.classList.add("ti-control-record");
		child.nextElementSibling.classList.toggle("text-success");
		myCategory.id.splice(myCategory.id.indexOf(child.id), 1);
		myCategory.names.splice(myCategory.names.indexOf(name), 1);
	} else {
		child.checked = true;
		child.nextElementSibling.classList.add("ti-check");
		child.nextElementSibling.classList.toggle("text-success");
		child.nextElementSibling.classList.remove("ti-control-record");
		myCategory.id.push(child.id);
		myCategory.names.push(name);
	}
	// console.log(myCategory);
	// still works
	// on.checked ? on.checked = false : on.checked = true;
}

// This function shows and hides the create category section and
// This function close the create category section
// create is a bool that either open or close the sectuon
const category_control = document.getElementById("category_control");
let control;
function createCategoryControl(create, e) {
	if (create) {
		control = e;
		category_control.style.display = "block";
		category_control.classList.remove("smooth-close");
		category_control.classList.add("smooth-open");
		control.style.display = "none";
		parentSection = true;
		getAxios("/admin/category", (err, data) => {
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
			displayCategory(data || []);
			empty();
		});	
	} else {
		empty();
		category_control.classList.remove("smooth-open");
		category_control.classList.add("smooth-close");

		setTimeout(() => {
			category_control.style.display = "none";
			control.style.display = "block";
		}, 1700);
		parentSection = false;
	}
}


// 
