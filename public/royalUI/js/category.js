
// url for the axios.get and post method
const hostURL = window.location.origin;



// using messageBird
const messageBox = document.getElementById("littleMessageBox");
const messageBird = document.getElementById("littleMessage");

// message sender
function messager(data) {
	$("#littleMessageBox").fadeIn(() => {
		setTimeout(() => {
			$("#littleMessageBox").fadeOut();
		}, 7000);
	});
	messageBox.classList.replace(`alert-${data.replace[0]}`, `alert-${data.replace[1]}`);
	messageBird.innerHTML = data.message;
}



// store the categories
let allCategory;
refresh()
// Get req to get all cartegory
function refresh() {

	axios.get(hostURL + "/admin/category").then((res) => {
		console.log("res::: ", res.data);
		allCategory = res.data;
		displayCategory(allCategory || []);
	}).catch((err) => {
		console.log(":::ERr ", err);
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

	if (data.name) postCartegory(data);
	else messager({
		replace: ["success", "danger"],
		message: "Category has no name"
	});
}
// add a new category
function postCartegory(data) {

	axios.post(hostURL + "/admin/category", data).then(function (res) {
		// console.log("data ", res.data);
		refresh();
		messager({
			replace: ["success", "danger"],
			message: "Category has been added"
		});
	}).catch(function (err) {
		console.error("Could not add to cart! ", err);
	});
}


const model = document.getElementById("parent");
// show modal
function modal() {
	model.style.display = "flex";
}

// deactivate modal
window.onclick = (e) => {
	if (e.target == model) {
		model.style.display = "none";
		console.log("outq");
	}
}

// get the children then if clicked update it with the value
const parentInputName = document.getElementById("inputParentName");
const parentInputId = document.getElementById("inputParentId");
const children = document.getElementsByClassName("children");
// This is use to get both the name and the id of the categories the will be sent to the server
const formCategoryName = document.getElementById("formCategoryName");
const formCategoryId = document.getElementById("formCategoryId");

let childValue = {};

// empty childValue
function empty() {
	parentInputName.value = "";
	parentInputId.value = "";
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
			<input type="checkbox" id="${cat._id}" />

			${cat.parents.length ? cat.parents[0].name + " -> " : ""}
			${cat.name}
		</div>
		<input type="hidden" name="id" value="${cat._id}">
		<input type="hidden" name="id" value="${cat.name}">
		<span class="badge badge-primary badge-pill">
		${cat.products.length}
		</span>
	</li>`;
	});
	body += `</ul>`;
	document.getElementById("categoryBody").innerHTML = body;


	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		child.addEventListener("click", () => {

			// when parent section is true the function for the list of categories will only change the parent section
			let parentSection = false;
			if(parentSection){
				// get name and id of the clicked element and put it in parent Input
				// console.log(child.children[1].value);
				childValue.id = child.children[1].value;
				// console.log(child.children[2].value);
				childValue.name = child.children[2].value;
				
				parentInputName.value = "Parent -> " + childValue.name;
				parentInputId.value = childValue.id;
				
				// activate checkbox
			}else{
				addToCategory(child.firstElementChild.firstElementChild, child.children[2].value);
				formCategoryName.value = myCategory.names.toString();
				formCategoryId.value = myCategory.id;
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
	console.log(child.id);
	if(child.checked){
		child.checked = false;
		myCategory.id.splice(myCategory.id.indexOf(child.id), 1);
		myCategory.names.splice(myCategory.names.indexOf(name), 1);
	}else{
		child.checked = true;
		myCategory.id.push(child.id);
		myCategory.names.push(name);
	}
	console.log(myCategory);
	// still works
	// on.checked ? on.checked = false : on.checked = true;
}