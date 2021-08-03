
// assign total product to total product box
const total_product = document.getElementsByClassName("total-product");
// get the product tbody from the DOM
const tbody = document.getElementsByTagName("tbody")[0];

function displayProductTable(products) {
	let tableBody = (data) => {
		return `
			<td>
				${data.index + 1}
			</td>
			<td>
				<img src="/${data.img.length ? data.img[0].path : "../aronoz/img/favicon.png"}"
				alt="${data.img.length && data.img[0].fileName}">
			</td>
			<td style="text-transform: capitalize;">
				${data.name}
			</td>
			<td title="${data._id}">
				${data._id.toString().substr(0, 5)}...
			</td>
			<td>
				$ ${data.price}
			</td>
			<td>
				${data.isAvaliable}
			</td>
			<td>
				${data.isFeatured}
			</td>
			<td>
				<div class="option template-demo d-flex justify-content-between flex-nowrap">
					<button type="button"
						class="btn btn-primary btn-rounded btn-icon" onclick="btnLink('/admin/edit/${data._id}?edit=true', '${data._id}')">
						<i class="ti-pencil"></i>
					</button>
					<button type="button"
						class="btn btn-danger btn-rounded btn-icon" onclick="modal({type: 'form', message: 'Are you sure you want to delete <strong>${data.name}</strong>.', title: 'Confirm Your Request', method: {name: 'deleteItem', params: {url: 'productsAPI', itemId: '${data._id}'}}})">
						<i class="ti-trash"></i>
					</button>
					<button type="button"
						class="btn btn-success btn-rounded btn-icon" onclick="btnLink('/category/${data._id}?preview=true', '${data._id}')">
						<i class="ti-eye"></i>
					</button>
				</div>
			</td><td></td>`;
	}

	tbody.innerHTML = "";
	// input product new length
	total_product[0].innerHTML = products.length;
	total_product[1].innerHTML = products.length;
	products.forEach((product, index) => {
		const tr = document.createElement("tr");
		tr.className = "option-container";
		tr.innerHTML = tableBody({index, ...product})
		tbody.append(tr); 
	});
}

// on page load
// Display Products in product page

getAxios("/admin/productsAPI", (err, data)=>{
	if (err) {
		console.log("err:::", err);
	}
	else{
		displayProductTable(data);
	}
});
