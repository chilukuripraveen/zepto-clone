const PRODUCTS = [
  { id: 1, category: 'grocery', subcategory: 'Staples', name: 'Aashirvaad Atta', weight: '5 kg', price: 295, oldPrice: 340, discount: 13, image: 'assets/products/grocery/atta.svg', description: 'Whole wheat flour for soft rotis' },
  { id: 2, category: 'grocery', subcategory: 'Staples', name: 'India Gate Basmati Rice', weight: '5 kg', price: 499, oldPrice: 575, discount: 13, image: 'assets/products/grocery/rice.svg', description: 'Long grain aromatic basmati rice' },
  { id: 3, category: 'grocery', subcategory: 'Oils & Ghee', name: 'Fortune Sunflower Oil', weight: '1 L', price: 139, oldPrice: 165, discount: 16, image: 'assets/products/grocery/oil.svg', description: 'Light everyday cooking oil' },
  { id: 4, category: 'grocery', subcategory: 'Breakfast', name: 'Kellogg\'s Corn Flakes', weight: '300 g', price: 149, oldPrice: 185, discount: 19, image: 'assets/products/grocery/cereal.svg', description: 'Crispy breakfast cereal' },
  { id: 5, category: 'grocery', subcategory: 'Snacks', name: 'Haldiram\'s Aloo Bhujia', weight: '200 g', price: 72, oldPrice: 85, discount: 15, image: 'assets/products/grocery/snacks.svg', description: 'Crunchy spicy namkeen' },
  { id: 6, category: 'grocery', subcategory: 'Dairy', name: 'Amul Taaza Milk', weight: '1 L', price: 68, oldPrice: 72, discount: 6, image: 'assets/products/grocery/milk.svg', description: 'Fresh toned milk' },
  { id: 7, category: 'grocery', subcategory: 'Dairy', name: 'Amul Butter', weight: '100 g', price: 56, oldPrice: 60, discount: 7, image: 'assets/products/grocery/butter.svg', description: 'Creamy salted butter' },
  { id: 8, category: 'grocery', subcategory: 'Household', name: 'Surf Excel Matic', weight: '2 kg', price: 319, oldPrice: 385, discount: 17, image: 'assets/products/grocery/detergent.svg', description: 'Powerful fabric detergent' },
  { id: 9, category: 'drinks', subcategory: 'Soft Drinks', name: 'Thums Up', weight: '750 ml', price: 38, oldPrice: 45, discount: 16, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/314a.jpg', description: 'Bold sparkling cola drink' },
  { id: 10, category: 'drinks', subcategory: 'Fruit Juices', name: 'Maaza Mango Fruit Drink', weight: '150 ml', price: 24, oldPrice: 30, discount: 20, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/427007a.jpg', description: 'Rich mango fruit drink' },
  { id: 11, category: 'drinks', subcategory: 'Water', name: 'Bisleri Mineral Water', weight: '1 L', price: 39, oldPrice: 45, discount: 13, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/21699a.jpg', description: 'Packaged drinking water' },
  { id: 12, category: 'drinks', subcategory: 'Energy Drinks', name: 'Monster Energy Drink', weight: '350 ml', price: 100, oldPrice: 125, discount: 20, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/403174a.jpg', description: 'Energy drink for an active day' },
  { id: 13, category: 'drinks', subcategory: 'Fruit Juices', name: 'Tropicana Orange Juice', weight: '1 L', price: 85, oldPrice: 105, discount: 19, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/376a.jpg', description: 'Refreshing orange fruit juice' },
  { id: 14, category: 'drinks', subcategory: 'Herbal Drinks', name: 'Patanjali Aloe Vera Juice', weight: '1 L', price: 200, oldPrice: 235, discount: 15, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/53703a.jpg', description: 'Herbal wellness drink' },
  { id: 15, category: 'drinks', subcategory: 'Soda & Mixes', name: 'Bisleri Soda', weight: '750 ml', price: 14, oldPrice: 20, discount: 30, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/34354a.jpg', description: 'Sparkling soda mixer' },
  { id: 16, category: 'drinks', subcategory: 'Soft Drinks', name: 'Coca-Cola Zero', weight: '300 ml', price: 38, oldPrice: 45, discount: 16, image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=250,h=250/app/images/products/sliding_image/15286a.jpg', description: 'Zero sugar cola drink' },
  { id: 17, category: 'personal-care', subcategory: 'Bath & Body', name: 'Dove Cream Beauty Bar', weight: '100 g', price: 58, oldPrice: 65, discount: 11, image: 'assets/products/personal-care/soap.svg', description: 'Moisturising beauty bar' },
  { id: 18, category: 'personal-care', subcategory: 'Hair Care', name: 'Head & Shoulders Shampoo', weight: '180 ml', price: 189, oldPrice: 230, discount: 18, image: 'assets/products/personal-care/shampoo.svg', description: 'Anti-dandruff shampoo' },
  { id: 19, category: 'personal-care', subcategory: 'Oral Care', name: 'Colgate MaxFresh', weight: '150 g', price: 110, oldPrice: 135, discount: 19, image: 'assets/products/personal-care/toothpaste.svg', description: 'Fresh gel toothpaste' },
  { id: 20, category: 'personal-care', subcategory: 'Skin Care', name: 'Nivea Soft Cream', weight: '100 ml', price: 149, oldPrice: 175, discount: 15, image: 'assets/products/personal-care/cream.svg', description: 'Light moisturising cream' },
  { id: 21, category: 'personal-care', subcategory: 'Bath & Body', name: 'Lux Rose Soap', weight: '100 g', price: 42, oldPrice: 50, discount: 16, image: 'assets/products/personal-care/lux.svg', description: 'Floral bathing soap' },
  { id: 22, category: 'personal-care', subcategory: 'Hair Care', name: 'Pantene Hairfall Control', weight: '180 ml', price: 179, oldPrice: 215, discount: 17, image: 'assets/products/personal-care/pantene.svg', description: 'Strengthening shampoo' },
  { id: 23, category: 'personal-care', subcategory: 'Oral Care', name: 'Listerine Cool Mint', weight: '250 ml', price: 145, oldPrice: 170, discount: 15, image: 'assets/products/personal-care/mouthwash.svg', description: 'Daily mouthwash' },
  { id: 24, category: 'personal-care', subcategory: 'Skin Care', name: 'Vaseline Body Lotion', weight: '200 ml', price: 199, oldPrice: 240, discount: 17, image: 'assets/products/personal-care/lotion.svg', description: 'Deep moisture body lotion' },
  { id: 25, category: 'vegetables-fruits', subcategory: 'Fresh Fruits', name: 'Fresh Apple', weight: '4 pcs', price: 149, oldPrice: 185, discount: 19, image: 'assets/products/vegetables-fruits/apple.svg', description: 'Crisp sweet apples' },
  { id: 26, category: 'vegetables-fruits', subcategory: 'Fresh Fruits', name: 'Banana Robusta', weight: '6 pcs', price: 55, oldPrice: 68, discount: 19, image: 'assets/products/vegetables-fruits/banana.svg', description: 'Naturally sweet bananas' },
  { id: 27, category: 'vegetables-fruits', subcategory: 'Fresh Vegetables', name: 'Farm Fresh Tomato', weight: '500 g', price: 39, oldPrice: 50, discount: 22, image: 'assets/products/vegetables-fruits/tomato.svg', description: 'Juicy red tomatoes' },
  { id: 28, category: 'vegetables-fruits', subcategory: 'Root Vegetables', name: 'Fresh Onion', weight: '1 kg', price: 45, oldPrice: 58, discount: 22, image: 'assets/products/vegetables-fruits/onion.svg', description: 'Everyday red onions' },
  { id: 29, category: 'vegetables-fruits', subcategory: 'Root Vegetables', name: 'Fresh Potato', weight: '1 kg', price: 42, oldPrice: 52, discount: 19, image: 'assets/products/vegetables-fruits/potato.svg', description: 'Washed table potatoes' },
  { id: 30, category: 'vegetables-fruits', subcategory: 'Fresh Vegetables', name: 'Crunchy Carrot', weight: '500 g', price: 49, oldPrice: 65, discount: 25, image: 'assets/products/vegetables-fruits/carrot.svg', description: 'Fresh orange carrots' },
  { id: 31, category: 'vegetables-fruits', subcategory: 'Leafy Vegetables', name: 'Spinach Leaves', weight: '250 g', price: 25, oldPrice: 35, discount: 29, image: 'assets/products/vegetables-fruits/spinach.svg', description: 'Tender green spinach' },
  { id: 32, category: 'vegetables-fruits', subcategory: 'Herbs & Spices', name: 'Coriander Bunch', weight: '100 g', price: 18, oldPrice: 25, discount: 28, image: 'assets/products/vegetables-fruits/coriander.svg', description: 'Fragrant fresh coriander' }
];

const CATEGORY_META = {
  grocery: { label: 'Groceries', description: 'Everyday staples and kitchen essentials', image: 'assets/categories/grocery.svg', banner: 'assets/banners/grocery-banner.svg' },
  drinks: { label: 'Drinks', description: 'Refreshments for every mood', image: 'assets/categories/drinks.svg', banner: 'assets/banners/drinks-banner.svg' },
  'personal-care': { label: 'Personal Care', description: 'Simple care for you and your family', image: 'assets/categories/personal-care.svg', banner: 'assets/banners/personal-care-banner.svg' },
  'vegetables-fruits': { label: 'Vegetables & Fruits', description: 'Fresh produce for a healthy you', image: 'assets/categories/fruits-vegetables.svg', banner: 'assets/banners/fruits-banner.svg' }
};

function getProductById(id) { return PRODUCTS.find((product) => Number(product.id) === Number(id)); }
function getProductsByCategory(category) { return PRODUCTS.filter((product) => product.category === category); }
function formatPrice(value) { return `₹${Number(value).toLocaleString('en-IN')}`; }
function productAsset(product) { return product.category === 'drinks' && product.image.startsWith('http') ? `assets/products/drinks/source-${product.id}.jpg` : `assets/products/${product.category}/products.svg`; }
function searchProducts(query) {
  const term = query.trim().toLowerCase();
  if (!term) return PRODUCTS.slice();
  return PRODUCTS.filter((product) => [product.name, product.description, product.category, product.subcategory, product.weight].some((value) => value.toLowerCase().includes(term)));
}
function sortProducts(products, sort) {
  const result = products.slice();
  if (sort === 'price-low') return result.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') return result.sort((a, b) => b.price - a.price);
  if (sort === 'name') return result.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'discount') return result.sort((a, b) => b.discount - a.discount);
  return result;
}
function productCard(product) {
  const assetPrefix = document.body.dataset.assetPrefix || '';
  const asset = productAsset(product);
  const imageSrc = asset.startsWith('http') ? asset : `${assetPrefix}${asset}`;
  return `<article class="product-card" data-product-id="${product.id}"><div class="product-image"><img src="${imageSrc}" alt="${product.name}" loading="lazy"><span class="discount-tag">${product.discount}% OFF</span></div><div class="product-card-body"><h3>${product.name}</h3><p class="product-weight">${product.weight}</p><div class="product-price"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div><button class="add-to-cart" data-product-id="${product.id}" type="button">Add</button></div></article>`;
}
