function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; document.body.appendChild(toast); }
  toast.textContent = message; toast.classList.add('show'); window.clearTimeout(toast.timer); toast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
}
function initSharedUI() {
  updateCartUI();
  initSearch();
  initSorting();
  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('.add-to-cart');
    if (addButton) { addToCart(addButton.dataset.productId); return; }
    const action = event.target.closest('[data-cart-action]');
    if (action) { const id = action.dataset.productId; if (action.dataset.cartAction === 'increase') increaseQuantity(id); if (action.dataset.cartAction === 'decrease') decreaseQuantity(id); if (action.dataset.cartAction === 'remove') removeFromCart(id); return; }
    const locationButton = event.target.closest('[data-location-button]');
    if (locationButton) { const location = window.prompt('Enter your delivery location', localStorage.getItem('zeptoLocation') || ''); if (location) { localStorage.setItem('zeptoLocation', location); updateLocation(); } }
    const loginButton = event.target.closest('[data-login-button]');
    if (loginButton) { const name = window.prompt('Enter your name for this demo', localStorage.getItem('zeptoUserName') || ''); if (name) { localStorage.setItem('zeptoUserName', name); localStorage.setItem('zeptoLogin', 'true'); updateLogin(); } }
  });
  updateLocation(); updateLogin();
}
function updateLocation() { document.querySelectorAll('[data-location-label]').forEach((node) => { node.textContent = localStorage.getItem('zeptoLocation') || 'Select location'; }); }
function updateLogin() { document.querySelectorAll('[data-login-label]').forEach((node) => { node.textContent = localStorage.getItem('zeptoUserName') || 'Login'; }); }
function renderFeaturedProducts() { const listing = document.querySelector('[data-featured-products]'); if (listing) listing.innerHTML = PRODUCTS.slice(0, 8).map(productCard).join(''); }
function renderCategoryProducts() { const listing = document.querySelector('[data-product-list]'); if (!listing) return; const category = listing.dataset.category; listing.innerHTML = getProductsByCategory(category).map(productCard).join(''); const count = document.querySelector('[data-result-count]'); if (count) count.textContent = `${getProductsByCategory(category).length} products`; }
function setupCheckout() {
  const addressForm = document.querySelector('#addressForm');
  if (addressForm) { const saved = JSON.parse(localStorage.getItem('deliveryAddress') || 'null'); if (saved) Object.entries(saved).forEach(([key, value]) => { const field = addressForm.elements[key]; if (field) field.value = value; }); addressForm.addEventListener('submit', (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(addressForm)); localStorage.setItem('deliveryAddress', JSON.stringify(data)); window.location.href = 'payment.html'; }); }
  const paymentForm = document.querySelector('#paymentForm');
  if (paymentForm) { paymentForm.addEventListener('submit', (event) => { event.preventDefault(); localStorage.setItem('paymentMethod', new FormData(paymentForm).get('paymentMethod') || 'Cash on Delivery'); localStorage.setItem('orderId', `ZEP-${Math.floor(100000 + Math.random() * 900000)}`); clearCart(); document.querySelector('#successModal')?.removeAttribute('hidden'); }); }
}
function setupCartPage() { const summary = document.querySelector('[data-order-summary]'); if (!summary) return; const subtotal = getCartTotal(); const delivery = subtotal >= 499 || subtotal === 0 ? 0 : 25; const handling = subtotal === 0 ? 0 : 5; summary.innerHTML = `<div><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div><div><span>Delivery fee</span><strong>${delivery ? formatPrice(delivery) : 'FREE'}</strong></div><div><span>Handling fee</span><strong>${formatPrice(handling)}</strong></div><div class="summary-total"><span>Total</span><strong>${formatPrice(subtotal + delivery + handling)}</strong></div>`; const checkout = document.querySelector('[data-checkout]'); if (checkout) checkout.href = getCart().length ? 'address.html' : '#'; }
document.addEventListener('DOMContentLoaded', () => { initSharedUI(); renderFeaturedProducts(); renderCategoryProducts(); setupCheckout(); setupCartPage(); });
