// 
prepareCategoryList((cb)=>{
	displayCategory(cb || []);
});

// for preparing the categories for display and selection
function prepareCategoryList(callback) {
	getAxios("/admin/categoryAPI", (err, data) => {
		if (err) {
			console.log(":::", err);
			messager({
				replace: ["success", "danger"],
				message: "Please Refresh. Problem loading Pages."
			});
			return;
		}
		callback(data);
	});
}


// get the newCategory data and post to the server
const newCategory = document.getElementById("newCategory");
function createNewCategory() {
	let data = {
		name: newCategory.value,
		parent: childValue.id
	}
	console.log("new");

	if (data.name) postAxios({ url: "/admin/categoryAPI", _data: data }, (error, response) => {
		if (error) {
			console.log(":::", err);
			messager({
				replace: ["success", "danger"],
				message: "Task Failed!"
			});
			return;
		}
		else {
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

const parentInputName = document.getElementById("inputParentName");
const parentInputId = document.getElementById("inputParentId");
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
	if (window.location.pathname !== "/admin/category") formCategoryName.value = "";
}

// print list of categories to be selected from
function displayCategory(category) {
	if (!category) {
		console.log("Category is empty");
		return;
	}
	let body = `<ul class="list-group">`;
	category.forEach(cat => {
		body += `<li class="list_of_categories list-group-item list-group-item-action d-flex justify-content-between align-items-center">
		<div class="">
		<!-- This check box is just to check if the category is checked or not easily and it also holds the category id -->
			<input type="checkbox" id="${cat._id}" hidden/>
			<i class="ti-control-record"></i>
			${cat.parents.length ? ` <i class="tool-tip cursor-pointer ti-more" gloss="${cat.parents.slice().reverse().map(parent => parent.name + " ")}"></i> ` + cat.parents[0].name + ` <i class="ti-arrow-circle-right"></i> ` : ""}
			<strong>${cat.name}</strong>
		</div>
		<input type="hidden" value="${cat._id}">
		<input type="hidden" value="${cat.name}">
		<span class="tool-tip tool-tip-left badge badge-primary badge-pill" gloss="${cat.name} has ${cat.products.length} ${cat.products.length > 1 ? "products" : "product"}">
		${cat.products.length}
		</span>
		</li>`;
	});
	body += `</ul>`;
	document.getElementById("categoryBody").innerHTML = body;


	// get the list_of_categories then if clicked, update it with the value
	const li_list_of_categories = document.getElementsByClassName("list_of_categories");
	onCategoryClick(li_list_of_categories);
}

// If a category in the listis clicked activate this function
function onCategoryClick(list_of_categories) {
	for (let i = 0; i < list_of_categories.length; i++) {
		const child = list_of_categories[i];
		child.addEventListener("click", () => {

			if (parentSection) {
				// get name and id of the clicked element and put it in parent Input
				// console.log(child.list_of_categories[1].value);
				childValue.id = child.list_of_categories[1].value;
				// console.log(child.list_of_categories[2].value);
				childValue.name = child.list_of_categories[2].value;

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
			displayCategory(data || []);
			if (window.location.pathname === "/admin/category") displayCategoryTable(data);
			empty();
		});
	} else {
		// close the form
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

// assign total product to total product box
const total_category = document.getElementsByClassName("total_category");
// get the product tbody from the DOM
const tbody = document.getElementsByTagName("tbody")[0];

// display the list of category in the category Page
function displayCategoryTable(categories) {
	let tableBody = (data) => {
		return `
			<tr class="option-container">
				<td>
					${data.index + 1}
				</td>
				<td style="text-transform: capitalize;">
					${data.name}
				</td>
				<td>
					${data.products.length}
				</td>
				<td>
					<div class="option template-demo d-flex justify-content-between flex-nowrap">
						<button type="button"
							class="btn btn-danger btn-rounded btn-icon" onclick="modal({type: 'form', message: 'Are you sure you want to delete <strong>${data.name}</strong>.', title: 'Confirm Your Request', method: {name: 'deleteItem', params: {url: 'categoryAPI', itemId: '${data._id}'}}})">
							<i class="ti-trash"></i>
						</button>
						<button type="button"
							class="btn btn-success btn-rounded btn-icon" onclick="modal({type: 'categoryInfo', index: ${data.index}, title: 'About <strong>${data.name}</strong>'})">
							<i class="ti-eye"></i>
						</button>
					</div>
				</td>
			</tr>`;
	}

	tbody.innerHTML = "";
	// input product new length
	total_category[0].innerHTML = categories.length;
	total_category[1].innerHTML = categories.length;

	categories.forEach((category, index) => {
		const tr = document.createElement("tr");
		tr.className = "option-container";
		tr.innerHTML = tableBody({ index, ...category });
		tbody.append(tr);
	});
}

// on page load
// Display category in product page
if (window.location.pathname === "/admin/category") getAxios("/admin/categoryAPI", (err, data) => {
	if (err) {
		console.log("err:::", err);
	}
	else {
		displayCategoryTable(data);
	}
});
