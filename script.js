let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =============================
// ADD TO CART
// =============================

const cartButtons = document.querySelectorAll(".cart-btn");

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".shop-card");

        const productName =
            card.querySelector("h3").textContent;

        const productCategory =
            card.querySelector(".category-name").textContent;

        const productPrice =
            card.querySelector(".price").textContent;

        const productImage =
            window.getComputedStyle(
                card.querySelector(".shop-image")
            ).backgroundImage;

        const product = {
            name: productName,
            category: productCategory,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert(productName + " added to cart!");

    });

});


// =============================
// DISPLAY CART
// =============================

const cartItems = document.getElementById("cartItems");

if (cartItems) {

    displayCart();

}


function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Start shopping and add some products.
                </p>

            </div>
        `;

    }


    cart.forEach(function(product, index) {

        let priceNumber =
            parseInt(
                product.price.replace(/[^0-9]/g, "")
            );


        // Quantity नसल्यास 1
        if (!product.quantity) {
            product.quantity = 1;
        }


        let productTotal =
            priceNumber * product.quantity;

        total += productTotal;


        const item = document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div
                class="cart-item-image"
                style="background-image:${product.image}">
            </div>


            <div class="cart-item-details">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.category}
                </p>

                <p>
                    ₹${priceNumber.toLocaleString("en-IN")}
                </p>


                <div class="quantity-box">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <p class="item-total">
                    Total:
                    ₹${productTotal.toLocaleString("en-IN")}
                </p>


                <button
                    class="remove-btn"
                    onclick="removeItem(${index})">
                    REMOVE
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("finalTotal").textContent =
        "₹" + total.toLocaleString("en-IN");


    // Save updated quantity
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// =============================
// INCREASE QUANTITY
// =============================

function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// =============================
// DECREASE QUANTITY
// =============================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}


// =============================
// REMOVE PRODUCT
// =============================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();

}

// =============================
// LOGIN
// =============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = loginForm
            .querySelector('input[type="email"]')
            .value
            .trim()
            .toLowerCase();

        const password = loginForm
            .querySelector('input[type="password"]')
            .value;

        const savedUser =
            JSON.parse(localStorage.getItem("user"));


        if (!savedUser) {

            alert("Please create an account first.");

            return;
        }


        const savedEmail =
            savedUser.email.trim().toLowerCase();


        if (
            email === savedEmail &&
            password === savedUser.password
        ) {

            alert(
                "Login Successful! Welcome " +
                savedUser.name
            );

            window.location.href = "home.html";

        } else {

            alert("Invalid email or password!");

        }

    });

}
// =============================
// SIGN UP
// =============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();

        const email = document.getElementById("signupEmail").value.trim().toLowerCase();

        const password = document.getElementById("signupPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        const user = {
            name: name,
            email: email,
            password: password
        };


        localStorage.setItem("user", JSON.stringify(user));


        alert("Account created successfully!");


        window.location.href = "login.html";

    });

}