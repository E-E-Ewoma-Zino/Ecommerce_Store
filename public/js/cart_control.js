// 


let cartArray = [];

if (getCartItem() == null || getCartItem() == undefined || getCartItem().length == 0) {
    cartArray = [];
    // do nothing
}
else {
    cartArray = getCartItem();
}


// adds items to cart
const cartBtn = document.getElementsByClassName("add_cart");


try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];

        cart.addEventListener("click", () => {
            const productID = cart.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value;

            // TODO: MAKE A FUCTION TO ADD TO CART ARRAY
            addToCart(cart, productID);
            save(cartArray);

            toggle(cart, productID);

            // counts the cart item
            cartCounter();
        });
    }
} catch (err) {
    console.log(":::", err);
}

// toggle cart icon\
function toggle(cart, productID) {
    for (let i = 0; i < getCartItem().length; i++) {
        const item = getCartItem()[i];

        if (item == productID) {
            console.log("item in cart");

            break;
        }
        else {
            console.log("not in cart");

        }
    }
}

// function to check if item in cart already exist
function addToCart(cart, productID) {
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
                removeItem(cartArray, item);
                console.log("removed");
                cart.firstElementChild.classList.remove("fa-check");
                cart.firstElementChild.classList.add("fa-cart-plus");
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
    console.log(cartArray);
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
if(window.location.pathname == "/cart"){

    postCartData(getCartItem());
}




// THIS FUNCTION POST CART TO ORDER DB
// Post to the cart using axios
function postCartData(data) {
    axios.post('http://localhost:3000/cart', { data: data })
        .then(function (res) {
            // console.log(res);
            // updates cart counter
        })
        .catch(function (err) {
            console.log("::::::", err);
        });
}

// TODO: Remove item from cart

// 


// update cart counter
function cartCounter() {
    const cart_alert = document.getElementById("cart_alert");

    // if items in cart update the value
    // get the value of items in the cart
    // style the ::after property of the cart icon
    if (getCartItem() == null || getCartItem() == undefined || getCartItem().length == 0) {
        cart_alert.style.display = "none";
        cart_alert.innerHTML = 0;
    }
    else {
        cart_alert.style.display = "flex";
        cart_alert.innerHTML = getCartItem().length;
    }
}

cartCounter();


// IF CART HAS BEEN SELECTED MARK IT

try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];
        // Get all the product id
        const productID = cart.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value;
        // check if item already in cart
        for (let i = 0; i < getCartItem().length; i++) {
            // get the products in the local storage
            const item = getCartItem()[i];

            // if its in cart skip
            if (item == productID) {
                // toggle 
                // if the item is in cart then check it
                cart.firstElementChild.classList.remove("fa-cart-plus");
                cart.firstElementChild.classList.add("fa-check");
                break;
            }
            else {
                // if search all and item not found add item
                if (i == getCartItem().length - 1) {
                    // if the item is not in cart don't check it
                    cart.firstElementChild.classList.remove("fa-check");
                    cart.firstElementChild.classList.add("fa-cart-plus");
                    break;
                }
                continue;
            }
        }
    }
} catch (err) {
    console.log(":::", err);
}

