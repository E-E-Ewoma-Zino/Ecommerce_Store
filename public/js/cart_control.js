// 
// holds productID in array
let cartArray = [];
const logIn = document.getElementById("logIn").attributes[3].value == "true"? true: false;
let user;

try {
    user = document.getElementById("user").attributes[3].value;
} catch (err) {
    console.log("err: ", err);
}


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
            const productID = cart.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value;

            checked(i)

            // TODO: MAKE A FUCTION TO ADD TO CART ARRAY            
            addToCart(cart, productID);
            save(cartArray);

            // counts the cart item
            // cartCounter();
        });
    }
} catch (err) {
    console.log(":::", err);
}

// function to check if item in cart already exist
function addToCart(cart, productID) {
    if (logIn) {
        addToCart2(cart, productID, user);
    } else {
        // add first item
        if (cartArray.length == 0) {
            cartArray.push(productID);

            // toggle 
            cart.firstElementChild.classList.remove("fa-cart-plus");
            cart.firstElementChild.classList.add("fa-check");
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
                        cartArray.push(productID);
                        // toggle 
                        cart.firstElementChild.classList.remove("fa-cart-plus");
                        cart.firstElementChild.classList.add("fa-check");
                        break;
                    }
                    continue;
                }
            }

        }
    }
    // console.log(cartArray);
    cartCounter();
}

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
    arr = JSON.stringify(arr)
    localStorage.setItem("cart", arr);
}
// gets array from local storage
function getCartItem() {
    return JSON.parse(localStorage.getItem("cart"));
}

// TODO: MAKE A FUNCTION TO DISPLAY PRODUCTS IN CART
// when link goes to cart
if (window.location.pathname == "/cart") {
    getCartData();
    if(!logIn) cartBody(cartData.items);
}


// if user is loged in
function addToCart2(cart, productID, user) {
    if (logIn) {

        const data = {
            productID: productID,
            userID: user
        }
        postCartData(cart, data);
    }
}

// To get cart data when the user is loged in
getCartData();
// get the total cart number
let cartData;


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

// THIS FUNCTION POST CART TO ORDER DB
// Post to the cart using axios
function postCartData(cart, data) {
    if (!navigator.onLine) {
        alert("You are Offline");
        return;
    }
    cart.innerHTML = `<img class="d-inline-block" src="/img/loader.svg" alt="loading" width="25px" height="25px">`;
    axios.post("http://localhost:3000/cartitem", { data: data }, { timeout: 10000 })
        .then(function (res) {
            console.log(res);
            // updates cart counter
            // toggle 
            getCartData();
            console.log("Posted to cart");
            cart.innerHTML = `<i class="fas fa-check text-success"></i>`;
        })
        .catch(function (err) {

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

// TODO: Remove item from cart

// 


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

if(!logIn) checkedCart(getCartItem());
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



function cartBody(items) {
    const tbody = document.getElementById("tbody");
    let body =(img,name,total,price,id)=> `<tr>
    <td>
        <div class="media">
            <div class="d-flex">
                <img class="product_img cart-img" src="${img}"
                    alt="<%= item.product.name %>" />
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
        <h5 class="cart_total">${(Number(price.replace(/,/g, "")) * Number(1)).toLocaleString()}
        </h5>
    </td>
    <td>
        <form action="/cart" method="POST">
            <input type="hidden" name="_method" value="DELETE">
            <input type="hidden" name="itemId" value="${id}">
            <button type="submit" class="delete">
                <i class="fa fa-times"></i>
            </button>
        </form>
    </td>
</tr>
`;
    let concat = "";
    items.forEach(item => {
        concat += body(item.img, item.name, item.total, item.price, item._id);
    });
    tbody.innerHTML = concat;
}

// TODO: display localstorage items in cart