/*
=========================================================
 ZEPTO CLONE - SEARCH & FILTER
 File: js/search.js
=========================================================

Features:
- Search products
- Filter by subcategory
- Sort products
- Show result count
- Show "No products found"
- Reset filters
=========================================================
*/


// ========================================================
// GLOBAL SEARCH STATE
// ========================================================

let currentSearchTerm = "";
let currentCategory = "all";
let currentSort = "default";


// ========================================================
// GET PRODUCT CARDS
// ========================================================

function getProductCards() {

    return Array.from(
        document.querySelectorAll(".product-card")
    );
}


// ========================================================
// GET PRODUCT DATA FROM CARD
// ========================================================

function getCardProductData(card) {

    const productId =
        card.dataset.productId ||
        card.querySelector(".add-to-cart")?.dataset.productId;


    if (!productId) {
        return null;
    }


    /*
    First try to get the product from products.js.
    */

    const product =
        typeof getProductById === "function"
            ? getProductById(productId)
            : null;


    if (product) {
        return product;
    }


    /*
    Fallback for HTML cards.
    */

    const addButton =
        card.querySelector(".add-to-cart");


    return {

        id: productId,

        name:
            addButton?.dataset.productName ||
            card.querySelector(".product-name")?.textContent.trim() ||
            "",

        price:
            Number(
                addButton?.dataset.productPrice ||
                0
            ),

        description:
            card.querySelector(".product-description")?.textContent.trim() ||
            "",

        weight:
            card.querySelector(".product-weight")?.textContent.trim() ||
            "",

        category:
            document
                .getElementById("productGrid")
                ?.dataset.category ||
            "",

        subcategory:
            card.dataset.subcategory ||
            ""
    };
}


// ========================================================
// SEARCH MATCH
// ========================================================

function productMatchesSearch(product, searchTerm) {

    if (!searchTerm) {
        return true;
    }


    const term =
        searchTerm.toLowerCase().trim();


    const searchableText = [

        product.name,
        product.description,
        product.category,
        product.subcategory,
        product.weight

    ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();


    return searchableText.includes(term);
}


// ========================================================
// CATEGORY MATCH
// ========================================================

function productMatchesCategory(product, category) {

    if (
        !category ||
        category === "all"
    ) {

        return true;
    }


    return (
        product.subcategory?.toLowerCase() ===
        category.toLowerCase()
    );
}


// ========================================================
// FILTER PRODUCTS
// ========================================================

function filterProducts() {

    const cards =
        getProductCards();


    if (cards.length === 0) {
        return;
    }


    let visibleCards = [];


    // ----------------------------------------------------
    // FILTER
    // ----------------------------------------------------

    cards.forEach(card => {

        const product =
            getCardProductData(card);


        if (!product) {
            return;
        }


        const searchMatch =
            productMatchesSearch(
                product,
                currentSearchTerm
            );


        const categoryMatch =
            productMatchesCategory(
                product,
                currentCategory
            );


        if (
            searchMatch &&
            categoryMatch
        ) {

            card.classList.remove(
                "hidden"
            );

            card.style.display = "";

            visibleCards.push({
                card,
                product
            });

        } else {

            card.classList.add(
                "hidden"
            );

            card.style.display = "none";
        }
    });


    // ----------------------------------------------------
    // SORT
    // ----------------------------------------------------

    sortVisibleCards(visibleCards);


    // ----------------------------------------------------
    // RESULT COUNT
    // ----------------------------------------------------

    updateResultCount(
        visibleCards.length
    );


    // ----------------------------------------------------
    // NO PRODUCTS MESSAGE
    // ----------------------------------------------------

    updateNoProductsMessage(
        visibleCards.length
    );
}


// ========================================================
// SORT VISIBLE CARDS
// ========================================================

function sortVisibleCards(visibleCards) {

    if (
        !visibleCards.length ||
        currentSort === "default"
    ) {

        return;
    }


    visibleCards.sort(
        (a, b) => {

            const productA =
                a.product;

            const productB =
                b.product;


            switch (currentSort) {

                // ----------------------------------------
                // PRICE LOW TO HIGH
                // ----------------------------------------

                case "price-low":

                    return (
                        productA.price -
                        productB.price
                    );


                // ----------------------------------------
                // PRICE HIGH TO LOW
                // ----------------------------------------

                case "price-high":

                    return (
                        productB.price -
                        productA.price
                    );


                // ----------------------------------------
                // NAME A-Z
                // ----------------------------------------

                case "name":

                    return productA.name.localeCompare(
                        productB.name
                    );


                // ----------------------------------------
                // DISCOUNT
                // ----------------------------------------

                case "discount":

                    return (
                        calculateProductDiscount(productB) -
                        calculateProductDiscount(productA)
                    );


                default:

                    return 0;
            }
        }
    );


    const grid =
        document.getElementById(
            "productGrid"
        );


    if (!grid) {
        return;
    }


    /*
    Move the cards into the new sorted order.
    */

    visibleCards.forEach(
        item => {
            grid.appendChild(item.card);
        }
    );
}


// ========================================================
// CALCULATE PRODUCT DISCOUNT
// ========================================================

function calculateProductDiscount(product) {

    if (
        !product.oldPrice ||
        product.oldPrice <= product.price
    ) {

        return 0;
    }


    return (
        (
            (product.oldPrice - product.price) /
            product.oldPrice
        ) * 100
    );
}


// ========================================================
// UPDATE RESULT COUNT
// ========================================================

function updateResultCount(count) {

    /*
    Possible elements:
    #resultCount
    .result-count
    */

    const resultElement =
        document.getElementById(
            "resultCount"
        ) ||
        document.querySelector(
            ".result-count"
        );


    if (!resultElement) {
        return;
    }


    resultElement.textContent =
        `${count} product${count !== 1 ? "s" : ""} found`;
}


// ========================================================
// UPDATE NO PRODUCTS MESSAGE
// ========================================================

function updateNoProductsMessage(count) {

    const noProducts =
        document.getElementById(
            "noProducts"
        );


    if (!noProducts) {
        return;
    }


    if (count === 0) {

        noProducts.style.display =
            "block";

    } else {

        noProducts.style.display =
            "none";
    }
}


// ========================================================
// SEARCH INPUT
// ========================================================

function initializeSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            currentSearchTerm =
                this.value;


            filterProducts();
        }
    );


    /*
    If the input already contains text,
    apply it immediately.
    */

    if (searchInput.value.trim()) {

        currentSearchTerm =
            searchInput.value;

        filterProducts();
    }
}


// ========================================================
// SEARCH FORM / ENTER KEY
// ========================================================

function initializeSearchSubmit() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                filterProducts();

                /*
                Keep the user on the current
                product page.
                */
            }
        }
    );
}


// ========================================================
// SUBCATEGORY BUTTONS
// ========================================================

function initializeCategoryFilters() {

    const buttons =
        document.querySelectorAll(
            ".subcategory-btn"
        );


    if (!buttons.length) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                /*
                Remove active class
                from all buttons.
                */

                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );
                });


                /*
                Make clicked button active.
                */

                this.classList.add(
                    "active"
                );


                /*
                Read category.

                Supported HTML examples:

                data-category="Staples"

                or

                data-filter="Staples"

                or

                button text.
                */

                currentCategory =
                    this.dataset.category ||
                    this.dataset.filter ||
                    this.textContent.trim();


                /*
                "All" means no category filter.
                */

                if (
                    currentCategory.toLowerCase() ===
                    "all"
                ) {

                    currentCategory =
                        "all";
                }


                filterProducts();
            }
        );
    });
}


// ========================================================
// SORT DROPDOWN
// ========================================================

function initializeSorting() {

    const sortSelect =
        document.getElementById(
            "sortProducts"
        );


    if (!sortSelect) {
        return;
    }


    sortSelect.addEventListener(
        "change",
        function () {

            currentSort =
                this.value;


            filterProducts();
        }
    );
}


// ========================================================
// CLEAR SEARCH
// ========================================================

function clearSearch() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.value = "";
    }


    currentSearchTerm =
        "";

    filterProducts();
}


// ========================================================
// RESET ALL FILTERS
// ========================================================

function resetFilters() {

    currentSearchTerm =
        "";

    currentCategory =
        "all";

    currentSort =
        "default";


    // Reset search input

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.value = "";
    }


    // Reset sorting

    const sortSelect =
        document.getElementById(
            "sortProducts"
        );


    if (sortSelect) {

        sortSelect.value =
            "default";
    }


    // Reset category buttons

    const buttons =
        document.querySelectorAll(
            ".subcategory-btn"
        );


    buttons.forEach(button => {

        button.classList.remove(
            "active"
        );


        const text =
            button.textContent
                .trim()
                .toLowerCase();


        if (text === "all") {

            button.classList.add(
                "active"
            );
        }
    });


    filterProducts();
}


// ========================================================
// SEARCH FROM URL
// ========================================================

function initializeURLSearch() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const search =
        params.get("search");


    if (!search) {
        return;
    }


    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.value =
            search;
    }


    currentSearchTerm =
        search;


    filterProducts();
}


// ========================================================
// KEYBOARD SHORTCUT
// ========================================================

function initializeSearchShortcut() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
            "/" opens search.

            Do not trigger while typing
            in another input.
            */

            if (
                event.key === "/" &&
                event.target.tagName !== "INPUT" &&
                event.target.tagName !== "TEXTAREA"
            ) {

                event.preventDefault();


                const searchInput =
                    document.getElementById(
                        "searchInput"
                    );


                if (searchInput) {

                    searchInput.focus();
                }
            }
        }
    );
}


// ========================================================
// INITIALIZE SEARCH SYSTEM
// ========================================================

function initializeSearchSystem() {

    initializeSearch();

    initializeSearchSubmit();

    initializeCategoryFilters();

    initializeSorting();

    initializeURLSearch();

    initializeSearchShortcut();

    filterProducts();
}


// ========================================================
// RUN AFTER DOM LOAD
// ========================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeSearchSystem
);


// ========================================================
// MAKE FUNCTIONS AVAILABLE
// ========================================================

window.filterProducts =
    filterProducts;

window.clearSearch =
    clearSearch;

window.resetFilters =
    resetFilters;

window.searchProducts =
    searchProducts;