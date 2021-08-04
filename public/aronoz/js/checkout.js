// checkout controls
// TODO: When a user is logging in or signing up, sync cart_DB and cart_LS
// console.log("lol", localStorage.getItem("cart"));
const data = document.getElementById("cartData").setAttribute("value", localStorage.getItem("cart"));

const confirmForm = document.getElementById("confirmForm");
const proceed = document.getElementById("proceed");

confirmForm.addEventListener("click", function () {
	this.parentElement.lastElementChild.classList.toggle("text-danger");
});

confirmForm.nextElementSibling.addEventListener("click", function () {
	this.classList.toggle("text-danger");
	this.previousElementSibling.checked = this.previousElementSibling.checked == true ? false : true;
});

proceed.addEventListener("mouseenter", () => {
	if (!confirmForm.checked) {
		proceed.style.cursor = "no-drop";
		proceed.style.backgroundColor = "#cdcdcd";
		proceed.style.borderColor = "#cdcdcd";
		// 

	} else {
		proceed.style.cursor = "pointer";
		proceed.style.backgroundColor = "#ff3368";
		proceed.style.borderColor = "#ff3368";
		// proceed.setAttribute("title data-original-title", "");
		// set the href to link to something when it is checked
		// and do the payment methods check config
	}
});

// To post the form
const orderForm = document.getElementById("orderForm");
const couponForm = document.getElementById("couponForm");
// is this if() even working?? Opps :| i forget to add .checked :|
proceed.addEventListener("click", () => {
	if (confirmForm.checked) {
		makePayment((data) => {
			if (!data) {
				console.log("No data", data);
				messager({
					replace: ["success", "danger"],
					message: "Purchase failed!"
				});
			} else {
				// put the transation details in the form
				document.getElementsByClassName("flutterwaveDetails")[0].value = data.status;
				document.getElementsByClassName("flutterwaveDetails")[1].value = data.tx_ref;
				document.getElementsByClassName("flutterwaveDetails")[2].value = data.flw_ref;
				document.getElementsByClassName("flutterwaveDetails")[3].value = data.transaction_id;
				orderForm.submit();
			}
		});
	}
	else messager({
		replace: ["success", "danger"],
		message: "Form not confirmed!"
	});
});

// for bootstraps tooltip
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});


// 
// 
// SetUp for FlutterWave
const firstname = document.getElementById("firstname").value;
const number = document.getElementById("number").value;
const email = document.getElementById("email").value;
const price = document.getElementById("total").value;


function makePayment(callback) {
	try {
		FlutterwaveCheckout({
			public_key: "FLWPUBK_TEST-88cd4a7dc50e807c5da141b586b3a656-X",
			tx_ref: "RX1" + Math.floor(Math.random() * 9999999) + 1,
			amount: price,
			currency: "NGN",
			customer: {
				email: email,
				phone_number: number,
				name: firstname
			},
			callback: function (data) {
				console.log("I am completed", data);
				callback(data);
			},
			onclose: function () {
				// close modal
				console.log("closed function");
			},
			customizations: {
				title: "Aronoz",
				description: "Payment for items in cart",
			},
		});
	} catch (err) {
		console.log(err);
		if(err == "ReferenceError: FlutterwaveCheckout is not defined")	messager({
			replace: ["success", "danger"],
			message: "Little or No Connection!"
		});
	}
}
// check the data from callback
// fix modal
// fix loginv