const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const feedbackElement = document.getElementById("feedback");
const clearCartBtn = document.getElementById("clearCart");
const sortByPriceBtn = document.getElementById("sortByPrice");

const products = [
    { id: 1, Name: "Laptop", price: 50000 },
    { id: 2, Name: "Phone", price: 20000 },
    { id: 3, Name: "Tablet", price: 5000 },
    { id: 4, Name: "Smart Watch", price: 1000 },
    { id: 5, Name: "Head Phones", price: 500 }
];

const cart = [];

function renderProductDetails() {
    products.forEach(function (product) {
        const { id, Name, price } = product;
        const divElement = document.createElement("div");
        divElement.className = "product-row";
        divElement.innerHTML = `
            <p>${Name} - Rs. ${price}</p>
            <button onclick="addToCart(${id})">Add to Cart</button>
        `;
        productContainer.appendChild(divElement);
    });
}

function addToCart(id) {
    const isProductAvailable = cart.some(product => product.id === id);
    if (isProductAvailable) {
        updateUserFeedback(`Item already added to cart`, "error");
        return;
    }
    const productToAdd = products.find(product => product.id === id);
    cart.push(productToAdd);
    renderCartDetails();
    updateUserFeedback(`${productToAdd.Name} added to cart`, "success");
}

function renderCartDetails() {
    cartContainer.innerHTML = "";
    cart.forEach(function (product) {
        const { id, Name, price } = product;
        const cartItemRow = `
            <div class="product-row">
                <p>${Name} - Rs. ${price}</p>
                <button onclick="removeFromCart(${id})">Remove</button>
            </div>
        `;
        cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
    });

    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
    document.getElementById('totalPrice').textContent = `Rs.${totalPrice}`;
}

function removeFromCart(id) {
    const product = cart.find(product => product.id === id);
    const index = cart.findIndex(product => product.id === id);
    cart.splice(index, 1);
    updateUserFeedback(`${product.Name} is removed from the cart`, "error");
    renderCartDetails();
}

let TimerId;
function updateUserFeedback(msg, type) {
    clearTimeout(TimerId);
    feedbackElement.style.display = "block";
    feedbackElement.style.backgroundColor = type === "success" ? "green" : "red";
    feedbackElement.textContent = msg;
    TimerId = setTimeout(() => {
        feedbackElement.style.display = "none";
    }, 3000);
}

clearCartBtn.addEventListener('click', () => {
    cart.length = 0;
    renderCartDetails();
    updateUserFeedback("Cart is cleared", "success");
});

sortByPriceBtn.addEventListener("click", () => {
    cart.sort((a, b) => a.price - b.price);
    renderCartDetails();
});

renderProductDetails();
