
// url for the axios.get and post method
const hostURL = window.location.origin;


// Get req to get all cart ✅
function refresh() {

	axios.get(hostURL + "/admin/category").then((res) => {
		console.log("res::: ", res.data);
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
	postCartegory(data);
}
// add a new category
function postCartegory(data) {

	axios.post(hostURL + "/admin/category", data).then(function (res) {
		// console.log("data ", res.data);
		refresh();
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
let childValue = {};
for (let i = 0; i < children.length; i++) {
	const child = children[i];
	child.addEventListener("click", () => {
		console.log(child.children[1].value);
		childValue.id = child.children[1].value;
		console.log(child.children[2].value);
		childValue.name = child.children[2].value;

		if (childValue.name) {
			parentInputName.value = "Parent -> " + childValue.name;
			parentInputId.value = childValue.id;
		}
	});
}

