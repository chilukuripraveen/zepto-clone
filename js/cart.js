const CART_KEY = 'zeptoCart';

function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartUI(); }
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  const cart = getCart();
  const item = cart.find((entry) => Number(entry.id) === Number(productId));
  if (item) item.quantity += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, oldPrice: product.oldPrice, weight: product.weight, image: productAsset(product), quantity: 1 });
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}
function increaseQuantity(productId) { const cart = getCart(); const item = cart.find((entry) => Number(entry.id) === Number(productId)); if (item) item.quantity += 1; saveCart(cart); }
function decreaseQuantity(productId) { const cart = getCart(); const item = cart.find((entry) => Number(entry.id) === Number(productId)); if (item) item.quantity -= 1; saveCart(cart.filter((entry) => entry.quantity > 0)); }
function removeFromCart(productId) { saveCart(getCart().filter((entry) => Number(entry.id) !== Number(productId))); }
function clearCart() { saveCart([]); }
function getCartItemCount() { return getCart().reduce((total, item) => total + item.quantity, 0); }
function getCartTotal() { return getCart().reduce((total, item) => total + item.price * item.quantity, 0); }
function renderCartItems(targetId = 'cartItems') {
  const target = document.getElementById(targetId);
  if (!target) return;
  const cart = getCart();
  const assetPrefix = document.body.dataset.assetPrefix || '';
  target.innerHTML = cart.length ? cart.map((item) => `<div class="cart-item"><img src="${assetPrefix}${item.image}" alt="${item.name}"><div class="cart-item-info"><h3>${item.name}</h3><p>${item.weight}</p><strong>${formatPrice(item.price)}</strong></div><div class="quantity-control"><button type="button" data-cart-action="decrease" data-product-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-cart-action="increase" data-product-id="${item.id}" aria-label="Increase quantity">+</button></div><button class="remove-item" type="button" data-cart-action="remove" data-product-id="${item.id}">Remove</button></div>`).join('') : '<div class="empty-state"><span>🛒</span><h3>Your cart is empty</h3><p>Add fresh essentials to get started.</p><a class="button" href="../index.html">Start Shopping</a></div>';
}
function updateCartUI() {
  document.querySelectorAll('[data-cart-count]').forEach((node) => { node.textContent = getCartItemCount(); node.hidden = getCartItemCount() === 0; });
  const total = getCartTotal();
  document.querySelectorAll('[data-cart-total]').forEach((node) => { node.textContent = formatPrice(total); });
  renderCartItems('cartItems');
  renderCartItems('cartDrawerItems');
}
