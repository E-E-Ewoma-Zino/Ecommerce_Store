// this is where all my ajax stuff goes

const cartBtn = document.getElementsByClassName("add_cart");


for (let i = 0; i < cartBtn.length; i++) {
    const cart = cartBtn[i];
    const data = cart.parentElement.parentElement.firstElementChild.children[1].attributes[2];

    cart.addEventListener("click", () => {
        console.log("click ", i);
        postCartData(data);
    });
}


function postCartData(data) {
    axios.post('http://localhost:3000/cart', JSON.stringify(data))
        .then(function (res) {
            console.log(res);
        })
        .catch(function (err) {
            console.log("::::::", err);
        });
}