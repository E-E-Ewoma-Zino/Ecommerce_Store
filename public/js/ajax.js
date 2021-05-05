// Post to the cart using axios

const cartBtn = document.getElementsByClassName("add_cart");


try {
    for (let i = 0; i < cartBtn.length; i++) {
        const cart = cartBtn[i];

        cart.addEventListener("click", () => {
            const data = {
                amount: cart.parentElement.parentElement.firstElementChild.children[1].attributes[2].value,
                productID: cart.parentElement.parentElement.parentElement.parentElement.lastElementChild.attributes[3].value
            }
            console.log(data.amount);
            console.log("click ", i);
            postCartData(data);
        });
    }
} catch (err) {
    console.log(":::", err);
}



function postCartData(data) {
    axios.post('http://localhost:3000/cart', { data: data })
        .then(function (res) {
            // console.log(res);
        })
        .catch(function (err) {
            console.log("::::::", err);
        });
}