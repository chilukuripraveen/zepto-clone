/*
=========================================================
 ZEPTO CLONE - CART MANAGEMENT
 File: js/cart.js
=========================================================

Features:
- Add product to cart
- Remove product
- Increase / decrease quantity
- Cart count
- Cart drawer
- Cart page
- LocalStorage
- Clear cart
- Price calculation
- Checkout
=========================================================
*/


// ========================================================
// CART CONFIGURATION
// ========================================================

const CART_STORAGE_KEY = "zeptoCart";

const DELIVERY_FEE = 25;
const FREE_DELIVERY_LIMIT = 499;
const HANDLING_FEE = 5;


// ========================================================
// GET CART FROM LOCAL STORAGE
// ========================================================

function getCart() {

    try {

        const cart = JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY)
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {

        console.error("Unable to read cart:", error);

        return [];
    }
}


// ========================================================
// SAVE CART TO LOCAL STORAGE
// ========================================================

function saveCart(cart) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
    );
}


// ========================================================
// ADD PRODUCT TO CART
// ========================================================

function addToCart(productId) {

    const product = getProductById(productId);

    if (!product) {

        console.error(
            `Product not found: ${productId}`
        );

        return;
    }

    const cart = getCart();

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            weight: product.weight,
            emoji: product.emoji,
            quantity: 1

        });
    }


    saveCart(cart);

    updateCartUI();

    showAddToCartMessage(product.name);

    openCartDrawer();
}


// ========================================================
// INCREASE PRODUCT QUANTITY
// ========================================================

function increaseQuantity(productId) {

    const cart = getCart();

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    product.quantity += 1;

    saveCart(cart);

    updateCartUI();
}


// ========================================================
// DECREASE PRODUCT QUANTITY
// ========================================================

function decreaseQuantity(productId) {

    const cart = getCart();

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }


    if (product.quantity > 1) {

        product.quantity -= 1;

    } else {

        const index = cart.findIndex(
            item => item.id === productId
        );

        cart.splice(index, 1);
    }


    saveCart(cart);

    updateCartUI();
}


// ========================================================
// REMOVE PRODUCT FROM CART
// ========================================================

function removeFromCart(productId) {

    let cart = getCart();

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart(cart);

    updateCartUI();
}


// ========================================================
// CLEAR ENTIRE CART
// ========================================================

function clearCart() {

    localStorage.removeItem(
        CART_STORAGE_KEY
    );

    updateCartUI();
}


// ========================================================
// GET TOTAL NUMBER OF ITEMS
// ========================================================

function getCartItemCount() {

    const cart = getCart();

    return cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}


// ========================================================
// GET ITEM TOTAL
// ========================================================

function getCartItemTotal() {

    const cart = getCart();

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );
}


// ========================================================
// GET DELIVERY FEE
// ========================================================

function getDeliveryFee(itemTotal) {

    if (itemTotal === 0) {
        return 0;
    }

    if (itemTotal >= FREE_DELIVERY_LIMIT) {
        return 0;
    }

    return DELIVERY_FEE;
}


// ========================================================
// GET HANDLING FEE
// ========================================================

function getHandlingFee(itemTotal) {

    if (itemTotal === 0) {
        return 0;
    }

    return HANDLING_FEE;
}


// ========================================================
// GET FINAL CART TOTAL
// ========================================================

function getCartTotal() {

    const itemTotal = getCartItemTotal();

    const deliveryFee =
        getDeliveryFee(itemTotal);

    const handlingFee =
        getHandlingFee(itemTotal);

    return itemTotal +
        deliveryFee +
        handlingFee;
}


// ========================================================
// FORMAT MONEY
// ========================================================

function formatCartPrice(price) {

    return `₹${price.toLocaleString("en-IN")}`;
}


// ========================================================
// UPDATE CART COUNT
// ========================================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) {
        return;
    }

    const count =
        getCartItemCount();

    cartCount.textContent = count;

    if (count > 0) {

        cartCount.style.display = "flex";

    } else {

        cartCount.style.display = "none";
    }
}


// ========================================================
// CREATE CART ITEM HTML
// ========================================================

function createCartItemHTML(item) {

    const itemTotal =
        item.price * item.quantity;


    return `
        <div class="cart-item" data-product-id="${item.id}">

            <div class="cart-item-image">
                ${item.emoji || "🛒"}
            </div>


            <div class="cart-item-details">

                <h3 class="cart-item-name">
                    ${item.name}
                </h3>

                <p class="cart-item-weight">
                    ${item.weight}
                </p>


                <div class="cart-item-price">

                    ${formatCartPrice(item.price)}

                    ${
                        item.oldPrice
                            ? `
                                <span class="old-price">
                                    ${formatCartPrice(item.oldPrice)}
                                </span>
                              `
                            : ""
                    }

                </div>


                <div class="cart-item-actions">

                    <button
                        class="quantity-btn decrease-btn"
                        data-product-id="${item.id}"
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>


                    <span class="quantity">
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-btn increase-btn"
                        data-product-id="${item.id}"
                        aria-label="Increase quantity"
                    >
                        +
                    </button>

                </div>

            </div>


            <div class="cart-item-right">

                <strong>
                    ${formatCartPrice(itemTotal)}
                </strong>


                <button
                    class="remove-item"
                    data-product-id="${item.id}"
                    aria-label="Remove ${item.name}"
                >
                    ×
                </button>

            </div>

        </div>
    `;
}


// ========================================================
// EMPTY CART HTML
// ========================================================

function createEmptyCartHTML() {

    return `
        <div class="cart-empty-state">

            <div class="cart-empty-icon">
                🛒
            </div>

            <h3>Your cart is empty</h3>

            <p>
                Add some products to your cart
                and they will appear here.
            </p>

            <a
                href="../index.html"
                class="btn btn-primary"
            >
                Start Shopping
            </a>

        </div>
    `;
}


// ========================================================
// RENDER CART DRAWER
// ========================================================

function renderCartDrawer() {

    const drawer =
        document.getElementById("cartDrawer");

    if (!drawer) {
        return;
    }


    const cart =
        getCart();


    /*
    Important:
    We search INSIDE the drawer.

    This avoids problems caused by duplicate
    IDs on cart.html.
    */

    const cartItems =
        drawer.querySelector("#cartItems") ||
        drawer.querySelector(".cart-drawer-items");


    const cartTotal =
        drawer.querySelector("#cartTotal") ||
        drawer.querySelector(".cart-drawer-total");


    if (!cartItems) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML =
            createEmptyCartHTML();

    } else {

        cartItems.innerHTML =
            cart.map(createCartItemHTML).join("");
    }


    if (cartTotal) {

        cartTotal.textContent =
            formatCartPrice(getCartTotal());
    }
}


// ========================================================
// RENDER MAIN CART PAGE
// ========================================================

function renderCartPage() {

    const cartContent =
        document.getElementById("cartContent");

    const emptyCart =
        document.getElementById("emptyCart");


    /*
    If this is not cart.html,
    stop here.
    */

    if (!cartContent && !emptyCart) {
        return;
    }


    const cart =
        getCart();


    // ----------------------------------------------------
    // EMPTY CART
    // ----------------------------------------------------

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
            emptyCart.innerHTML =
                createEmptyCartHTML();
        }

        if (cartContent) {
            cartContent.style.display = "none";
        }

        return;
    }


    // ----------------------------------------------------
    // CART HAS PRODUCTS
    // ----------------------------------------------------

    if (emptyCart) {
        emptyCart.style.display = "none";
    }

    if (cartContent) {
        cartContent.style.display = "block";
    }


    /*
    Find main cart items.

    We intentionally search inside
    #cartContent instead of using a global
    #cartItems selector.
    */

    const cartItems =
        cartContent?.querySelector("#cartItems") ||
        cartContent?.querySelector(".cart-items");


    if (cartItems) {

        cartItems.innerHTML =
            cart.map(createCartItemHTML).join("");
    }


    // ----------------------------------------------------
    // UPDATE SUMMARY
    // ----------------------------------------------------

    const itemTotal =
        getCartItemTotal();

    const deliveryFee =
        getDeliveryFee(itemTotal);

    const handlingFee =
        getHandlingFee(itemTotal);

    const finalTotal =
        itemTotal +
        deliveryFee +
        handlingFee;


    const itemTotalElement =
        document.getElementById("itemTotal");

    const deliveryFeeElement =
        document.getElementById("deliveryFee");

    const handlingFeeElement =
        document.getElementById("handlingFee");

    const cartTotalElement =
        document.getElementById("cartTotal");


    if (itemTotalElement) {

        itemTotalElement.textContent =
            formatCartPrice(itemTotal);
    }


    if (deliveryFeeElement) {

        deliveryFeeElement.textContent =
            deliveryFee === 0
                ? "FREE"
                : formatCartPrice(deliveryFee);
    }


    if (handlingFeeElement) {

        handlingFeeElement.textContent =
            formatCartPrice(handlingFee);
    }


    if (cartTotalElement) {

        cartTotalElement.textContent =
            formatCartPrice(finalTotal);
    }


    // ----------------------------------------------------
    // FREE DELIVERY MESSAGE
    // ----------------------------------------------------

    updateFreeDeliveryMessage(itemTotal);
}


// ========================================================
// FREE DELIVERY MESSAGE
// ========================================================

function updateFreeDeliveryMessage(itemTotal) {

    const message =
        document.querySelector(".free-delivery-message");

    if (!message) {
        return;
    }


    if (itemTotal >= FREE_DELIVERY_LIMIT) {

        message.textContent =
            "🎉 You got FREE delivery!";

        return;
    }


    if (itemTotal > 0) {

        const remaining =
            FREE_DELIVERY_LIMIT - itemTotal;

        message.textContent =
            `Add ${formatCartPrice(remaining)} more for FREE delivery!`;

    } else {

        message.textContent =
            "";
    }
}


// ========================================================
// UPDATE ALL CART UI
// ========================================================

function updateCartUI() {

    updateCartCount();

    renderCartDrawer();

    renderCartPage();
}


// ========================================================
// OPEN CART DRAWER
// ========================================================

function openCartDrawer() {

    const drawer =
        document.getElementById("cartDrawer");

    if (!drawer) {
        return;
    }

    drawer.classList.add("open");

    document.body.classList.add("cart-drawer-open");
}


// ========================================================
// CLOSE CART DRAWER
// ========================================================

function closeCartDrawer() {

    const drawer =
        document.getElementById("cartDrawer");

    if (!drawer) {
        return;
    }

    drawer.classList.remove("open");

    document.body.classList.remove(
        "cart-drawer-open"
    );
}


// ========================================================
// SHOW ADD TO CART MESSAGE
// ========================================================

function showAddToCartMessage(productName) {

    /*
    Simple notification.

    If you later want a custom toast,
    we can move this into app.js.
    */

    let toast =
        document.getElementById("cartToast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id = "cartToast";

        toast.className =
            "cart-toast";

        document.body.appendChild(toast);
    }


    toast.textContent =
        `${productName} added to cart`;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}


// ========================================================
// HANDLE ADD TO CART BUTTONS
// ========================================================

function initializeAddToCartButtons() {

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".add-to-cart");


            if (!button) {
                return;
            }


            const productId =
                button.dataset.productId;


            if (!productId) {

                console.error(
                    "Add to Cart button is missing data-product-id"
                );

                return;
            }


            addToCart(productId);


            // Button visual feedback

            const originalText =
                button.textContent;

            button.textContent =
                "Added ✓";

            button.classList.add("added");


            setTimeout(() => {

                button.textContent =
                    originalText;

                button.classList.remove("added");

            }, 1200);
        }
    );
}


// ========================================================
// HANDLE CART QUANTITY / REMOVE BUTTONS
// ========================================================

function initializeCartActions() {

    document.addEventListener(
        "click",
        function (event) {


            // ------------------------------------------------
            // INCREASE
            // ------------------------------------------------

            const increaseButton =
                event.target.closest(".increase-btn");


            if (increaseButton) {

                const productId =
                    increaseButton.dataset.productId;

                increaseQuantity(productId);

                return;
            }


            // ------------------------------------------------
            // DECREASE
            // ------------------------------------------------

            const decreaseButton =
                event.target.closest(".decrease-btn");


            if (decreaseButton) {

                const productId =
                    decreaseButton.dataset.productId;

                decreaseQuantity(productId);

                return;
            }


            // ------------------------------------------------
            // REMOVE
            // ------------------------------------------------

            const removeButton =
                event.target.closest(".remove-item");


            if (removeButton) {

                const productId =
                    removeButton.dataset.productId;

                removeFromCart(productId);

                return;
            }
        }
    );
}


// ========================================================
// CART BUTTON
// ========================================================

function initializeCartButton() {

    const cartButton =
        document.querySelector(".cart-btn");


    if (!cartButton) {
        return;
    }


    cartButton.addEventListener(
        "click",
        function (event) {

            /*
            If cart button is inside a link,
            prevent unwanted navigation.
            */

            event.preventDefault();

            openCartDrawer();
        }
    );
}


// ========================================================
// CLOSE CART DRAWER
// ========================================================

function initializeCartDrawer() {

    const drawer =
        document.getElementById("cartDrawer");

    if (!drawer) {
        return;
    }


    const closeButton =
        drawer.querySelector(".cart-drawer-close");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeCartDrawer
        );
    }


    // Click outside drawer

    drawer.addEventListener(
        "click",
        function (event) {

            if (
                event.target === drawer ||
                event.target.classList.contains(
                    "cart-drawer-overlay"
                )
            ) {

                closeCartDrawer();
            }
        }
    );


    // Escape key

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeCartDrawer();
            }
        }
    );
}


// ========================================================
// CLEAR CART BUTTON
// ========================================================

function initializeClearCart() {

    const clearButton =
        document.getElementById("clearCart");


    if (!clearButton) {
        return;
    }


    clearButton.addEventListener(
        "click",
        function () {

            if (getCartItemCount() === 0) {
                return;
            }


            const confirmed =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (confirmed) {

                clearCart();
            }
        }
    );
}


// ========================================================
// CHECKOUT BUTTON
// ========================================================

function initializeCheckout() {

    const checkoutButton =
        document.getElementById("checkoutBtn");


    if (!checkoutButton) {
        return;
    }


    checkoutButton.addEventListener(
        "click",
        function () {

            if (getCartItemCount() === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            /*
            GitHub Pages demo:

            We simply move to address.html.
            */

            window.location.href =
                "address.html";
        }
    );
}


// ========================================================
// CART PAGE LINK
// ========================================================

function initializeCartPageLink() {

    const viewCartButton =
        document.querySelector(
            ".view-cart-btn"
        );


    if (!viewCartButton) {
        return;
    }


    viewCartButton.addEventListener(
        "click",
        function () {

            closeCartDrawer();
        }
    );
}


// ========================================================
// UPDATE PRODUCT BUTTON STATES
// ========================================================

function updateProductButtons() {

    const cart =
        getCart();


    document
        .querySelectorAll(".add-to-cart")
        .forEach(button => {

            const productId =
                button.dataset.productId;


            if (!productId) {
                return;
            }


            const exists =
                cart.some(
                    item => item.id === productId
                );


            if (exists) {

                button.classList.add("in-cart");

            } else {

                button.classList.remove("in-cart");
            }
        });
}


// ========================================================
// INITIALIZE CART
// ========================================================

function initializeCart() {

    initializeAddToCartButtons();

    initializeCartActions();

    initializeCartButton();

    initializeCartDrawer();

    initializeClearCart();

    initializeCheckout();

    initializeCartPageLink();

    updateCartUI();

    updateProductButtons();
}


// ========================================================
// RUN AFTER DOM LOAD
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeCart
);


// ========================================================
// MAKE FUNCTIONS AVAILABLE GLOBALLY
// ========================================================

window.getCart = getCart;
window.saveCart = saveCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.clearCart = clearCart;
window.getCartItemCount = getCartItemCount;
window.getCartItemTotal = getCartItemTotal;
window.getCartTotal = getCartTotal;
window.updateCartUI = updateCartUI;
window.openCartDrawer = openCartDrawer;
window.closeCartDrawer = closeCartDrawer;