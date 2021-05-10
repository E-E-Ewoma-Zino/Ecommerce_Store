// 


const cartArray = [];


// adds items to cart
const cartBtn = document.getElementsByClassName("add_cart");


try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];

        console.log();

        cart.addEventListener("click", () => {
            const productID = cart.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value;


            console.log("click ", i);
            // TODO: MAKE A FUCTION TO ADD TO CART ARRAY
            addToCart(productID);
            // toggle 
            cart.firstElementChild.classList.toggle("fa-check");
            // counts the cart item
            cartCounter();
            save(cartArray);
        });
    }
} catch (err) {
    console.log(":::", err);
}

// function to check if item in cart already exist
function addToCart(productID) {
    // add first item
    if (cartArray.length == 0) {
        cartArray.push(productID);
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
                break;
            }
            else {
                console.log("looking for ", productID);
                // if search all and item not found add item
                if (i == cartArray.length - 1) {
                    console.log("added new item");
                    cartArray.push(productID);
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
// when the btn that links to cart is clicked do..
const cartLink = document.getElementById("cart");
cartLink.addEventListener("click", ()=>{
    console.log("go to cart");
    getCartData();
});

// get to the cart using axios
function getCartData() {
    axios.get(`http://localhost:3000/cart?data=${JSON.stringify(getCartItem())}`)
        .then(function (res) {
            console.log(res);
            // updates cart counter
        })
        .catch(function (err) {
            console.log("::::::", err);
        });
}

// 


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
    if (getCartItem().length == 0) {
            cart_alert.style.display = "none";
    }
    else {
        cart_alert.style.display = "block";
        cart_alert.innerHTML = getCartItem().length;
    }
}

cartCounter();