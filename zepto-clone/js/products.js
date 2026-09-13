/*
=========================================================
 ZEPTO CLONE - PRODUCTS DATA
 File: js/products.js
=========================================================

Purpose:
- Store all product information in one place
- Used by cart.js
- Used by search.js
- Used by app.js
- Provides product details using product ID
=========================================================
*/

const PRODUCTS = [

    // =====================================================
    // GROCERY PRODUCTS
    // =====================================================

    {
        id: "grocery-001",
        category: "grocery",
        subcategory: "Staples",
        name: "Premium Rice",
        weight: "5 kg",
        price: 349,
        oldPrice: 399,
        discount: "12% OFF",
        emoji: "🍚",
        description: "Premium quality rice for everyday meals"
    },

    {
        id: "grocery-002",
        category: "grocery",
        subcategory: "Staples",
        name: "Wheat Flour",
        weight: "5 kg",
        price: 245,
        oldPrice: 270,
        discount: "10% OFF",
        emoji: "🌾",
        description: "Fresh and finely ground wheat flour"
    },

    {
        id: "grocery-003",
        category: "grocery",
        subcategory: "Staples",
        name: "Sunflower Oil",
        weight: "1 L",
        price: 139,
        oldPrice: 165,
        discount: "15% OFF",
        emoji: "🫗",
        description: "Light and healthy cooking oil"
    },

    {
        id: "grocery-004",
        category: "grocery",
        subcategory: "Staples",
        name: "Toor Dal",
        weight: "1 kg",
        price: 165,
        oldPrice: 180,
        discount: "8% OFF",
        emoji: "🫘",
        description: "High quality protein-rich dal"
    },

    {
        id: "grocery-005",
        category: "grocery",
        subcategory: "Biscuits",
        name: "Butter Biscuits",
        weight: "250 g",
        price: 40,
        oldPrice: 50,
        discount: "20% OFF",
        emoji: "🍪",
        description: "Crispy and delicious butter biscuits"
    },

    {
        id: "grocery-006",
        category: "grocery",
        subcategory: "Snacks",
        name: "Classic Potato Chips",
        weight: "100 g",
        price: 49,
        oldPrice: 60,
        discount: "18% OFF",
        emoji: "🥔",
        description: "Crispy salted potato chips"
    },

    {
        id: "grocery-007",
        category: "grocery",
        subcategory: "Breakfast",
        name: "Instant Coffee",
        weight: "250 g",
        price: 189,
        oldPrice: 210,
        discount: "10% OFF",
        emoji: "☕",
        description: "Rich and aromatic instant coffee"
    },

    {
        id: "grocery-008",
        category: "grocery",
        subcategory: "Staples",
        name: "Sugar",
        weight: "500 g",
        price: 48,
        oldPrice: 56,
        discount: "14% OFF",
        emoji: "🍬",
        description: "Fine quality white sugar"
    },


    // =====================================================
    // DRINKS PRODUCTS
    // =====================================================

    {
        id: "drink-001",
        category: "drinks",
        subcategory: "Soft Drinks",
        name: "Cola Soft Drink",
        weight: "750 ml",
        price: 45,
        oldPrice: 50,
        discount: "10% OFF",
        emoji: "🥤",
        description: "Refreshing fizzy cola drink"
    },

    {
        id: "drink-002",
        category: "drinks",
        subcategory: "Juices",
        name: "Orange Juice",
        weight: "1 L",
        price: 110,
        oldPrice: 125,
        discount: "12% OFF",
        emoji: "🍊",
        description: "Refreshing orange fruit juice"
    },

    {
        id: "drink-003",
        category: "drinks",
        subcategory: "Energy Drinks",
        name: "Energy Drink",
        weight: "250 ml",
        price: 110,
        oldPrice: 130,
        discount: "15% OFF",
        emoji: "⚡",
        description: "Refreshing energy drink"
    },

    {
        id: "drink-004",
        category: "drinks",
        subcategory: "Water",
        name: "Packaged Drinking Water",
        weight: "1 L",
        price: 20,
        oldPrice: 22,
        discount: "8% OFF",
        emoji: "💧",
        description: "Pure and refreshing drinking water"
    },

    {
        id: "drink-005",
        category: "drinks",
        subcategory: "Soft Drinks",
        name: "Lemon Drink",
        weight: "500 ml",
        price: 35,
        oldPrice: 40,
        discount: "10% OFF",
        emoji: "🍋",
        description: "Cool and refreshing lemon drink"
    },

    {
        id: "drink-006",
        category: "drinks",
        subcategory: "Juices",
        name: "Mango Drink",
        weight: "1 L",
        price: 85,
        oldPrice: 99,
        discount: "14% OFF",
        emoji: "🥭",
        description: "Sweet and refreshing mango drink"
    },

    {
        id: "drink-007",
        category: "drinks",
        subcategory: "Tea & Coffee",
        name: "Instant Coffee",
        weight: "200 g",
        price: 180,
        oldPrice: 198,
        discount: "9% OFF",
        emoji: "☕",
        description: "Smooth and aromatic coffee"
    },

    {
        id: "drink-008",
        category: "drinks",
        subcategory: "Milk Drinks",
        name: "Chocolate Milk Drink",
        weight: "200 ml",
        price: 35,
        oldPrice: 40,
        discount: "11% OFF",
        emoji: "🥛",
        description: "Creamy chocolate flavored milk drink"
    },


    // =====================================================
    // PERSONAL CARE PRODUCTS
    // =====================================================

    {
        id: "personal-001",
        category: "personal-care",
        subcategory: "Skincare",
        name: "Daily Moisturizing Lotion",
        weight: "250 ml",
        price: 170,
        oldPrice: 200,
        discount: "15% OFF",
        emoji: "🧴",
        description: "Daily moisturizing lotion for soft skin"
    },

    {
        id: "personal-002",
        category: "personal-care",
        subcategory: "Bath & Body",
        name: "Bath Soap",
        weight: "100 g",
        price: 38,
        oldPrice: 43,
        discount: "12% OFF",
        emoji: "🧼",
        description: "Gentle cleansing bath soap"
    },

    {
        id: "personal-003",
        category: "personal-care",
        subcategory: "Oral Care",
        name: "Herbal Toothpaste",
        weight: "150 g",
        price: 105,
        oldPrice: 117,
        discount: "10% OFF",
        emoji: "🪥",
        description: "Fresh herbal toothpaste for daily care"
    },

    {
        id: "personal-004",
        category: "personal-care",
        subcategory: "Haircare",
        name: "Shampoo",
        weight: "180 ml",
        price: 145,
        oldPrice: 175,
        discount: "18% OFF",
        emoji: "🧴",
        description: "Gentle shampoo for clean and healthy hair"
    },

    {
        id: "personal-005",
        category: "personal-care",
        subcategory: "Skincare",
        name: "Face Wash",
        weight: "100 ml",
        price: 135,
        oldPrice: 158,
        discount: "14% OFF",
        emoji: "🫧",
        description: "Refreshing face wash for daily use"
    },

    {
        id: "personal-006",
        category: "personal-care",
        subcategory: "Grooming",
        name: "Disposable Razors",
        weight: "1 pack",
        price: 95,
        oldPrice: 105,
        discount: "10% OFF",
        emoji: "🪒",
        description: "Smooth and comfortable disposable razors"
    },

    {
        id: "personal-007",
        category: "personal-care",
        subcategory: "Household",
        name: "Toilet Tissue Rolls",
        weight: "4 rolls",
        price: 125,
        oldPrice: 149,
        discount: "16% OFF",
        emoji: "🧻",
        description: "Soft and absorbent tissue rolls"
    },

    {
        id: "personal-008",
        category: "personal-care",
        subcategory: "Haircare",
        name: "Hair Conditioner",
        weight: "100 g",
        price: 155,
        oldPrice: 179,
        discount: "13% OFF",
        emoji: "🧴",
        description: "Smoothening conditioner for soft hair"
    },


    // =====================================================
    // FRUITS & VEGETABLES
    // =====================================================

    {
        id: "fruit-001",
        category: "vegetables-fruits",
        subcategory: "Fruits",
        name: "Fresh Apples",
        weight: "1 kg",
        price: 149,
        oldPrice: 175,
        discount: "15% OFF",
        emoji: "🍎",
        description: "Fresh and naturally sweet apples"
    },

    {
        id: "fruit-002",
        category: "vegetables-fruits",
        subcategory: "Fruits",
        name: "Bananas",
        weight: "1 kg",
        price: 55,
        oldPrice: 63,
        discount: "12% OFF",
        emoji: "🍌",
        description: "Fresh ripe bananas"
    },

    {
        id: "fruit-003",
        category: "vegetables-fruits",
        subcategory: "Fruits",
        name: "Fresh Oranges",
        weight: "1 kg",
        price: 85,
        oldPrice: 95,
        discount: "10% OFF",
        emoji: "🍊",
        description: "Juicy and fresh oranges"
    },

    {
        id: "vegetable-001",
        category: "vegetables-fruits",
        subcategory: "Vegetables",
        name: "Fresh Tomatoes",
        weight: "1 kg",
        price: 42,
        oldPrice: 51,
        discount: "18% OFF",
        emoji: "🍅",
        description: "Fresh red tomatoes"
    },

    {
        id: "vegetable-002",
        category: "vegetables-fruits",
        subcategory: "Vegetables",
        name: "Potatoes",
        weight: "1 kg",
        price: 38,
        oldPrice: 44,
        discount: "14% OFF",
        emoji: "🥔",
        description: "Fresh farm potatoes"
    },

    {
        id: "vegetable-003",
        category: "vegetables-fruits",
        subcategory: "Vegetables",
        name: "Onions",
        weight: "1 kg",
        price: 45,
        oldPrice: 54,
        discount: "16% OFF",
        emoji: "🧅",
        description: "Fresh quality onions"
    },

    {
        id: "vegetable-004",
        category: "vegetables-fruits",
        subcategory: "Vegetables",
        name: "Fresh Carrots",
        weight: "500 g",
        price: 42,
        oldPrice: 47,
        discount: "10% OFF",
        emoji: "🥕",
        description: "Fresh and crunchy carrots"
    },

    {
        id: "vegetable-005",
        category: "vegetables-fruits",
        subcategory: "Leafy Greens",
        name: "Fresh Spinach",
        weight: "250 g",
        price: 28,
        oldPrice: 32,
        discount: "13% OFF",
        emoji: "🥬",
        description: "Fresh green spinach leaves"
    }

];


// =========================================================
// MAKE PRODUCTS AVAILABLE TO OTHER JAVASCRIPT FILES
// =========================================================

window.PRODUCTS = PRODUCTS;


// =========================================================
// GET PRODUCT BY ID
// =========================================================

function getProductById(productId) {
    return PRODUCTS.find(product => product.id === productId);
}


// =========================================================
// GET PRODUCTS BY CATEGORY
// =========================================================

function getProductsByCategory(categoryName) {
    return PRODUCTS.filter(
        product => product.category === categoryName
    );
}


// =========================================================
// SEARCH PRODUCTS
// =========================================================

function searchProducts(searchTerm) {

    const term = searchTerm.toLowerCase().trim();

    if (!term) {
        return PRODUCTS;
    }

    return PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.subcategory.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
}


// =========================================================
// SORT PRODUCTS
// =========================================================

function sortProducts(products, sortType) {

    const sortedProducts = [...products];

    switch (sortType) {

        case "price-low":
            return sortedProducts.sort(
                (a, b) => a.price - b.price
            );

        case "price-high":
            return sortedProducts.sort(
                (a, b) => b.price - a.price
            );

        case "name":
            return sortedProducts.sort(
                (a, b) => a.name.localeCompare(b.name)
            );

        case "discount":
            return sortedProducts.sort(
                (a, b) => {
                    const discountA =
                        ((a.oldPrice - a.price) / a.oldPrice) * 100;

                    const discountB =
                        ((b.oldPrice - b.price) / b.oldPrice) * 100;

                    return discountB - discountA;
                }
            );

        default:
            return sortedProducts;
    }
}


// =========================================================
// GET PRODUCT COUNT
// =========================================================

function getProductCount(categoryName = null) {

    if (!categoryName) {
        return PRODUCTS.length;
    }

    return PRODUCTS.filter(
        product => product.category === categoryName
    ).length;
}


// =========================================================
// FORMAT PRICE
// =========================================================

function formatPrice(price) {
    return `₹${price}`;
}


// =========================================================
// CALCULATE DISCOUNT PERCENTAGE
// =========================================================

function calculateDiscount(price, oldPrice) {

    if (!oldPrice || oldPrice <= price) {
        return 0;
    }

    return Math.round(
        ((oldPrice - price) / oldPrice) * 100
    );
}


// =========================================================
// GET ALL CATEGORIES
// =========================================================

function getCategories() {

    return [
        ...new Set(
            PRODUCTS.map(product => product.category)
        )
    ];
}


// =========================================================
// DEBUG / TEST
// =========================================================

console.log(
    `Products loaded successfully: ${PRODUCTS.length}`
);