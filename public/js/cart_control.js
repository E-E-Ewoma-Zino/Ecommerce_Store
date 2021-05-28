// 
// holds productID in array
let cartArray = [];
const logIn = document.getElementById("logIn").attributes[3].value == "true" ? true : false;
// not useful
// let user;

// try {
//     user = document.getElementById("user").attributes[3].value;
// } catch (err) {
//     console.log("err: ", err);
// }


if (getCartItem() == null || getCartItem() == undefined || getCartItem().length == 0) {
    cartArray = [];
}
else {
    cartArray = getCartItem();
}


// adds items to cart
const cartBtn = document.getElementsByClassName("add_cart");

function checked(i) {
    document.querySelectorAll(".single_product_item")[i].style = "box-shadow: 0px 10px 20px 0px rgba(0, 23, 51, 0.09);";
    document.querySelectorAll(".single_product_item .single_product_text")[i].style = "padding: 32px 32px;";
    document.querySelectorAll(".cart_love")[i].children[0].classList.add("see");
    document.querySelectorAll(".cart_love")[i].children[1].classList.add("see");
    document.querySelectorAll(".cart_love")[i].children[2].classList.add("see");
}

try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];

        cart.addEventListener("click", () => {
            const productID = cart.parentElement.parentElement.parentElement.children[2].attributes[3].value;
            const quantity = cart.parentElement.parentElement.parentElement.children[2].attributes[3].value;

            checked(i)

            // TODO: MAKE A FUCTION TO ADD TO CART ARRAY            
            addToCart(cart, productID, quantity);
            save(cartArray);

            // counts the cart item
            // cartCounter();
        });
    }
} catch (err) {
    console.log(":::", err);
}

// function to check if item in cart already exist
function addToCart(cart, productID, quantity) {
    if (logIn) {
        addToCart2(cart, productID, quantity);
    } else {
        // add first item
        if (cartArray.length == 0) {
            cartArray.push({productID: productID, quantity: quantity});

            // toggle 
            cart.firstElementChild.classList.remove("fa-cart-plus");
            cart.firstElementChild.classList.add("fa-check");
            cartCounter();
        }
        else {
            // check if item already in cart
            for (let i = 0; i < cartArray.length; i++) {
                const item = cartArray[i];

                // if its in cart skip
                if (item == productID) {
                    console.log("item already added");
                    // if item already exist remove it
                    // removeItem(cartArray, item);
                    // console.log("removed");
                    // cart.firstElementChild.classList.remove("fa-check");
                    // cart.firstElementChild.classList.add("fa-cart-plus");
                    break;
                }
                else {
                    // if search all and item not found add item
                    if (i == cartArray.length - 1) {
                        console.log("added new item");
                        cartArray.push({productID: productID, quantity: quantity});
                        // toggle 
                        cart.firstElementChild.classList.remove("fa-cart-plus");
                        cart.firstElementChild.classList.add("fa-check");
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

// TODO: Remove item from cart
// removes a specific item from the ARRAY
function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

// TODO: save cart to local storage
function save(arr) {
    arr = JSON.stringify(arr);
    localStorage.setItem("cart", arr);
}
// gets array from local storage
function getCartItem() {
    return JSON.parse(localStorage.getItem("cart"));
}

// TODO: MAKE A FUNCTION TO DISPLAY PRODUCTS IN CART
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


// Get req to get all cart
function getCartData() {
    axios.get("http://localhost:3000/cartitem").then((res) => {
        // console.log("res::: ", res.data);
        cartData = res.data;

        cartCounter();
        checkedCart(cartData.item);

    }).catch((err) => {
        console.log(":::ERr ", err);
    });
}

// Store post data
let localCart = [];

// THIS FUNCTION POST CART TO ORDER DB
// Post to the cart using axios
function postCartData(cart, data) {
    if (navigator.onLine) {
        alert("You are Offline");
        return;
    }
    let config = {
        timeout: 10000
    }

    // start loading untile the product is added
    cart.innerHTML = `<img class="d-inline-block" src="/img/loader.svg" alt="loading" width="25px" height="25px">`;
    // 
    console.log("data ", data);
    axios.post("http://localhost:3000/cartitem", data, config).then(function (res) {
        // console.log(res);
        localCart = res.data;

        // When cart is clicked, postCartData() is called and this
        //  cartBody is called and in uses data gotten from cart to fill cart table
        if (localCart.length >= 0) cartBody(localCart);

        // updates cart counter
        // toggle 
        getCartData();
        cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
    }).catch(function (err) {
        if (err == "Error: timeout of 10000ms exceeded") {
            getCartData();
            console.log("Time out");
            console.log("Posted to cart");
            cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
        } else {
            // toggle 
            console.error("Could not add to cart! ", err);
            cart.innerHTML = `<i class="fas fa-times text-danger"></i>`;
            cart.firstElementChild.classList.remove("fa-cart-plus");
        }
    });
}


// update cart counter
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
// IF CART HAS BEEN SELECTED MARK IT (FOR USER)
function checkedCart(items) {

    try {
        for (let i = 0; i < cartBtn.length; i++) {
            const cart = cartBtn[i];
            // Get all the product id
            const productID = cart.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value;
            // check if item already in cart
            for (let j = 0; j < items.length; j++) {
                // get the products in the local storage
                let item;
                if (logIn) item = items[j].product._id;
                else item = items[j];


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

                    // if search all and item not found add item
                    if (j == items.length - 1) {
                        // if the item is not in cart don't check it
                        cart.firstElementChild.classList.add("fa-cart-plus");
                        cart.firstElementChild.classList.remove("fa-check");
                        break;
                    }
                    continue;
                }
            }
        }
    } catch (err) {
        console.log(":::", err);
    }

}


// TODO: display localstorage items in cart
function cartBody(items) {
    console.log("Render ", items);
    const tbody = document.getElementById("tbody");
    let body = (img, name, total, price, id) => `<tr>
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
                value="1" min="0"
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
</tr>
`;
    let concat = "";
    items.forEach(item => {
        concat += body(item.img[0].path, item.name, item.totalNo, item.price, item._id);
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
    // tedious
    iWantedToExpoortTheseFunctionButExportDidNotWork();

    const deleteCart = document.getElementsByClassName("delete");

    for (let i = 0; i < deleteCart.length; i++) {
        const item = deleteCart[i];
        const val = item.firstElementChild.attributes[2].value;
        item.addEventListener("click", () => {
            console.log("Remove ", val);
            // remove from local cart then save to local cart
            save(removeItem(cartArray, val));
            // This will post the new cart date and re-render the cart
            postCartData({}, getCartItem());
        });
    }
}

// functions to make the tbody have function
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