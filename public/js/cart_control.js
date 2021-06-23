// 

// url for the axios.get and post method
const hostURL = window.location.origin;

// holds productID in array ✅
let cartArray = [];
const logIn = document.getElementById("logIn").attributes[3].value == "true" ? true : false;

if (getCartItem() == null || getCartItem() == undefined || getCartItem().length == 0) {
    cartArray = [];
}
else {
    cartArray = getCartItem();
}


// adds items to cart ✅
const cartBtn = document.getElementsByClassName("add_cart");

function checked(i) {
    document.querySelectorAll(".single_product_item")[i].style = "box-shadow: 0px 10px 20px 0px rgba(0, 23, 51, 0.09);";
    document.querySelectorAll(".single_product_item .single_product_text")[i].style = "padding: 32px 32px;";
    document.querySelectorAll(".cart_love")[i].children[0].classList.add("see");
    document.querySelectorAll(".cart_love")[i].children[1].classList.add("see");
    document.querySelectorAll(".cart_love")[i].children[2].classList.add("see");
}
console.log(":::::MUST PRINTk::");

try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];

        cart.addEventListener("click", () => {
            // console.log(":::::MUST PRINTl::", productID, quantity);

            const productID = cart.parentElement.parentElement.parentElement.children[2].attributes[3].value;
            const quantity = cart.parentElement.parentElement.parentElement.children[3].attributes[3].value;

            checked(i);
            console.log(":::::::", productID, quantity);

            // TODO: MAKE A FUCTION TO ADD TO CART ARRAY    ✅         
            addToCart(cart, productID, quantity);
            save(cartArray);

            // counts the cart item
            // cartCounter();
        });
    }
} catch (err) {
    console.log(":::", err);
}

// function to check if item in cart already exist ✅
function addToCart(cart, productID, quantity) {
    if (logIn) {
        addToCart2(cart, productID, quantity);
    } else {
        // add first item
        if (cartArray.length == 0) {
            cartArray.push({ productID: productID, quantity: quantity });

            // toggle 
            // start loading untile the product is added
            cart.innerHTML = `<img class="d-inline-block" src="/img/loader.svg" alt="loading" width="25px" height="25px">`;
            cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
            cartCounter();
            // using messageBird to send message to user
            messager({
                replace: ["danger", "success"],
                message: "Added ",
                productID: productID
            });
        }
        else {
            // check if item already in cart
            for (let i = 0; i < cartArray.length; i++) {
                const item = cartArray[i];

                // if its in cart skip
                if (item.productID == productID) {
                    // using messageBird to send message to user
                    messager({
                        replace: ["success", "primary"],
                        message: "Item already exist ",
                        productID: productID
                    });
                    break;
                }
                else {
                    // if search all and item not found add item
                    if (i == cartArray.length - 1) {
                        cartArray.push({ productID: productID, quantity: quantity });
                        // toggle 
                        // start loading untile the product is added
                        cart.innerHTML = `<img class="d-inline-block" src="/img/loader.svg" alt="loading" width="25px" height="25px">`;
                        cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
                        // using messageBird to send message to user
                        messager({
                            replace: ["danger", "success"],
                            message: "Added ",
                            productID: productID
                        });
                        break;
                    }
                    cartCounter();
                    continue;
                }
            }
            cartCounter();
        }
        cartCounter();
    }
    // console.log(cartArray);
    cartCounter();
}

// TODO: Remove item from cart ✅
// removes a specific item from the ARRAY
function removeItem(arr, value) {
    arr.forEach((item, index) => {
        if (value.productID == item.productID) {
            console.log("Deleting... ", item.productID);
            arr.splice(index, 1);
            console.log("Done");
        }
    });
    console.log("withIN ", arr);
    return arr;
}

// TODO: save cart to local storage ✅
function save(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("cart", arr);
}
// gets array from local storage ✅
function getCartItem() {
    return JSON.parse(localStorage.getItem("cart"));
}

// TODO: MAKE A FUNCTION TO DISPLAY PRODUCTS IN CART ✅
// when link goes to cart
// get the total cart number
let cartData;
if (window.location.pathname == "/cart") {
    getCartData();
    if (!logIn) {
        // passed in an empty object so cart won't be undefined || null
        postCartData({}, getCartItem());
        // cartBody(getCartItem());
    };
}


// if user is loged in
function addToCart2(cart, productID, quantity) {
    if (logIn) {
        const data = {
            productID: productID,
            quantity: quantity,
        }
        postCartData(cart, data);
    }
}

// To get cart data when the user is loged in
getCartData();


// Get req to get all cart ✅
function getCartData() {
    axios.get(hostURL + "/cartitem").then((res) => {
        // console.log("res::: ", res.data);
        cartData = res.data;

        cartCounter();
        checkedCart(cartData.item);

    }).catch((err) => {
        console.log(":::ERr ", err);
    });
}

// using messageBird
const messageBox = document.getElementById("littleMessageBox");
const messageBird = document.getElementById("littleMessage");

// Store post data
let localCart = [];

// THIS FUNCTION POST CART TO ORDER DB ✅
// Post to the cart using axios
function postCartData(cart, data) {
    // if (!navigator.onLine) {
    //     alert("You are Offline");

    // }
    let config = {
        timeout: 4000
    }

    // start loading untile the product is added
    cart.innerHTML = `<img class="d-inline-block" src="/img/loader.svg" alt="loading" width="25px" height="25px">`;
    // 
    // console.log("data ", data);
    axios.post(hostURL + "/cartitem", data, config).then(function (res) {
        // console.log("data ", res.data);
        localCart = res.data;

        // When cart is clicked, postCartData() is called and this
        //  cartBody is called and in uses data gotten from cart to fill cart table
        if (!logIn && localCart.length >= 0) cartBody(localCart);

        // updates cart counter
        // toggle 
        getCartData();
        cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
        // using messageBird to send message to user
        messager({
            replace: ["danger", "success"],
            message: "Added ",
            productID: data.productID
        });
    }).catch(function (err) {
        // toggle 
        console.error("Could not add to cart! ", err);
        cart.innerHTML = `<i class="fas fa-times text-danger"></i>`;
        // using messageBird to send message to user
        messager({
            replace: ["success", "danger"],
            message: "Failed to add product ",
            productID: data.productID
        });
    });
}

// message sender
function messager(data) {
    $("#littleMessageBox").fadeIn(() => {
        setTimeout(() => {
            $("#littleMessageBox").fadeOut();
        }, 7000);
    });
    messageBox.classList.replace(`alert-${data.replace[0]}`, `alert-${data.replace[1]}`);
    if (logIn) messageBird.innerHTML = data.message + data.productID;
}

// update cart counter ✅
function cartCounter() {
    const cart_alert = document.getElementById("cart_alert");

    // if items in cart update the value
    // get the value of items in the cart
    if (logIn) {
        // if user logedIn
        if (cartData.item == null || cartData.item == undefined || cartData.item.length == 0) {
            cart_alert.style.display = "none";
            cart_alert.innerHTML = 0;
        }
        else {
            cart_alert.style.display = "flex";
            cart_alert.innerHTML = cartData.item.length;
        }
    } else {
        // when no user
        if (getCartItem() == null || getCartItem() == undefined || getCartItem().length == 0) {
            cart_alert.style.display = "none";
            cart_alert.innerHTML = 0;
        }
        else {
            cart_alert.style.display = "flex";
            cart_alert.innerHTML = getCartItem().length;
        }
    }
}

if (!logIn) checkedCart(getCartItem());
// IF CART HAS BEEN SELECTED MARK IT (FOR USER AND OFFLINE USER) ✅
function checkedCart(items) {
    console.log(" am here", items);
    try {
        for (let i = 0; i < cartBtn.length; i++) {
            const cart = cartBtn[i];
            // Get all the product id
            const productID = cart.parentElement.parentElement.parentElement.children[2].attributes[3].value;
            // check if item already in cart
            for (let j = 0; j < items.length; j++) {
                // get the products in the local storage
                let item;
                if (logIn) item = items[j].product._id;
                else item = items[j].productID;


                // if its in cart skip
                if (item == productID) {
                    checked(i);
                    // toggle 
                    // if the item is in cart then check it
                    cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
                    // cart.parentElement.parentElement.parentElement.style.display = "none!important";
                    break;
                }
                else {
                    // Do nothing
                    continue;
                }
            }
        }
    } catch (err) {
        console.log(":::", err);
    }

}


// TODO: display localstorage items in cart ✅
function cartBody(items) {
    console.log("Render ", items);
    const tbody = document.getElementById("tbody");
    let body = (img, name, quantity, total, price, id) => `<tr>
    <td>
        <div class="media">
            <div class="d-flex">
                <img class="product_img cart-img" src="${img.replace("public", "")}"
                    alt="${name}" />
            </div>
            <div class="media-body">
                <p>
                    ${name}
                </p>
            </div>
        </div>
    </td>
    <td>
        <h5>
            ${total}
        </h5>
    </td>
    <td>
        <h5 class="cart_price">$${price}
        </h5>
    </td>
    <td>
        <div class="product_count my_product_counter">
            <span class="input-number-decrement">
                <i class="ti-angle-down"></i>
            </span>
            <input class="input-number cart_value" type="text"
                value="${quantity}" min="0"
                max="${total}" tabindex="-1">
            <span class="input-number-increment">
                <i class="ti-angle-up"></i>
            </span>
        </div>
    </td>
    <td>
        <h5 class="cart_total">$${(Number(price.replace(/,/g, "")) * Number(1)).toLocaleString()}
        </h5>
    </td>
    <td>
    <button type="submit" class="delete">
    <input type="hidden" name="itemId" value="${id}">
            <i class="fa fa-times"></i>
        </button>
    </td>
</tr>`;

    // cancatinate all cart product and put it in html ✅
    let concat = "";
    items.forEach((item, index) => {
        concat += body(item.img[0].path, item.name, getCartItem()[index].quantity, item.totalNo, item.price, item._id);
    });
    concat += `<tr>
    <td></td>
    <td></td>
    <td>
        <h5>Subtotal</h5>
    </td>
    <td>
        <h5 id="subTotal">0</h5>
    </td>
</tr>`;
    tbody.innerHTML = concat;
    // tedious :(
    iWantedToExpoortTheseFunctionButExportDidNotWork();

    const deleteCart = document.getElementsByClassName("delete");

    for (let i = 0; i < deleteCart.length; i++) {
        const item = deleteCart[i];
        item.addEventListener("click", () => {
            const productID = item.firstElementChild.attributes[2].value;
            // const quantity = item.parentElement.parentElement.children[3].firstElementChild.children[1].attributes[2].value;
            const quantity = document.getElementsByClassName("cart_value")[i].attributes[2].value;
            const val = {
                productID: productID,
                quantity: quantity
            };
            // console.log("value ", val);
            // It should work now :|
            save(removeItem(cartArray, val));
            // This will post the new cart date and re-render the cart
            postCartData({}, getCartItem());
        });
    }

    // to check if sync btn is clicked
    const cart_value = document.getElementsByClassName("cart_value");
    for (let i = 0; i < cart_value.length; i++) {
        const item = cart_value[i];
        const increment = item.parentElement.lastElementChild;
        const decrement = item.parentElement.firstElementChild;

        increment.addEventListener("click", () => {
            const itemValue = item.attributes[2].value;
            const productId = item.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.attributes[2].value;

            updateCart_LS(productId, itemValue);
        });

        decrement.addEventListener("click", () => {
            const itemValue = item.attributes[2].value;
            const productId = item.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.attributes[2].value;

            updateCart_LS(productId, itemValue);
        });
    }
}

// functions to make the tbody have function ✅
function iWantedToExpoortTheseFunctionButExportDidNotWork() {
    // click counter js
    //  to increase and decrease product counter

    let my_product_counter = document.getElementsByClassName("my_product_counter");

    try {
        for (let i = 0; i < my_product_counter.length; i++) {
            const element = my_product_counter[i];

            let min = element.children[1].attributes[3].value;
            let max = element.children[1].attributes[4].value;
            let val = element.children[1].attributes[2].value;

            let decr = element.children[0];
            let incr = element.children[2];

            decr.addEventListener("click", (e) => {
                decrement();
            });
            incr.addEventListener("click", (e) => {
                increment();
            });

            function decrement() {
                var value = val;
                value--;
                if (!min || value >= min) {
                    val = value;
                }
                element.children[1].attributes[2].value = val;
            }

            function increment() {
                var value = val;
                value++;
                if (!max || value <= max) {
                    val = value++;
                }
                element.children[1].attributes[2].value = val;
            }
        }
    } catch (err) {
        console.log(":::", err);
    }


    // calculate the total for cart
    function getTotal(total, price, val) {
        for (let i = 0; i < total.length; i++) {
            const t = total[i];
            const p = price[i];
            const v = val[i];

            t.innerHTML = "$" + (Number(p.innerHTML.replace(/[$]|[,]/g, "")) * Number(v.attributes[2].value)).toLocaleString();
        }
        try {
            subTotalUpdate();
        }
        catch (err) {
            console.log(":::", err);
        }
    }

    // to get values to calculate cart product counter
    try {
        for (let i = 0; i < my_product_counter.length; i++) {
            const element = my_product_counter[i];
            const price = document.getElementsByClassName("cart_price");
            const total = document.getElementsByClassName("cart_total");
            const val = document.getElementsByClassName("cart_value");

            let decr = element.children[0];
            let incr = element.children[2];

            incr.addEventListener("click", () => {
                getTotal(total, price, val);
            });

            decr.addEventListener("click", () => {
                getTotal(total, price, val);
            });

        }

    } catch (err) {
        console.log(":::", err);
    }


    function subTotalUpdate() {
        const subT = document.getElementById("subTotal");
        const total = document.getElementsByClassName("cart_total");
        let h = 0;
        for (let i = 0; i < total.length; i++) {
            const ele = total[i];
            h += Number(ele.innerHTML.replace(/[$]|[,]/g, ""));
        }

        subT.innerHTML = "$" + h.toLocaleString();
    }

    try {
        subTotalUpdate();
    } catch (err) {
        console.log(":::::err", err);
    }

}

// Update cart quantity for cart_LS✅
function updateCart_LS(productId, value) {
    console.log("updating ", productId, value);

    for (let i = 0; i < cartArray.length; i++) {
        const arr = cartArray[i];
        if (arr.productID == productId) {
            // console.log("check ", arr);
            // console.log("updating ", value);
            arr.quantity = value;
            break;
        }
    }
    // console.log(cartArray);
    save(cartArray);
}

// Update cart quantity for cart_DB
function updateCart_DB(productId, value) {
    // sends new data to database
    postCartData({}, {
        productID: productId,
        quantity: value
    });
}

// if cart quantity increase. Update
const cart_value = document.getElementsByClassName("cart_value");

for (let i = 0; i < cart_value.length; i++) {
    const item = cart_value[i];
    const increment = item.parentElement.lastElementChild;
    const decrement = item.parentElement.firstElementChild;


    decrement.addEventListener("click", () => {
        const itemValue = item.attributes[2].value;
        const productId = item.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.children[1].attributes[2].value;

        if (logIn) updateCart_DB(productId, itemValue);
    });
    increment.addEventListener("click", () => {
        const itemValue = item.attributes[2].value;
        const productId = item.parentElement.parentElement.parentElement.lastElementChild.firstElementChild.children[1].attributes[2].value;

        console.log("it ", productId, itemValue);
        if (logIn) updateCart_DB(productId, itemValue);
    });
}


// TODO: When a user is logging in or signing up, sync cart_DB and cart_LS
// this code is in the logIn and signUp pages(go there)

// If the user is loged in that means there will be no need for the data in localStorage
// because the data has been transfered to cart_DB. So we are clearing cart_LS
console.log("user.", logIn);
if (logIn) localStorage.clear();
console.log("LOL ", localStorage.getItem("cart"));