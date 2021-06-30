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
        // makePayment();
        orderForm.submit();
    }
    else alert("Form not confirmed!");
    // i think this should work :|
});

// for bootstraps tooltip
$(document).ready(function () {
    console.log("wertyui");
    $('[data-toggle="tooltip"]').tooltip();
});


// 
// 
// SetUp for FlutterWave
const firstname = document.getElementById("firstname").value;
const number = document.getElementById("number").value;
const email = document.getElementById("email").value;
const price = document.getElementById("total").value;

function makePayment() {
    console.log("Making Payment");
    FlutterwaveCheckout({
        public_key: "FLWPUBK-d54c06fe9df198dc11c99978d6ec1c7b-X",
        tx_ref: "RX1" + Math.floor(Math.random() * 9999999) + 1,
        amount: price,
        currency: "NG",
        country: "US",
        payment_options: " ",
        redirect_url: // specified redirect URL
            window.location.origin,
        meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
            email: email,
            phone_number: number,
            name: firstname
        },
        // callback: function (data) {
        //     console.log(data);
        // },
        onclose: function () {
            // close modal
            console.log("closed function");
        },
        customizations: {
            title: "Aronoz",
            description: "Payment for items in cart",
        },
    });
    console.log("Done Making Payment");
}
// check the data from callback
// fix modal
// fix loginv