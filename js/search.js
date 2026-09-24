function initSearch() {
  const input = document.querySelector('[data-search-input]');
  if (!input) return;
  const params = new URLSearchParams(window.location.search);
  input.value = params.get('q') || '';
  input.addEventListener('input', () => {
    const query = input.value;
    const listing = document.querySelector('[data-product-list]');
    if (!listing) return;
    const category = listing.dataset.category;
    let products = category ? getProductsByCategory(category) : PRODUCTS;
    products = searchProducts(query).filter((product) => !category || product.category === category);
    const sort = document.querySelector('[data-sort-select]')?.value || 'default';
    listing.innerHTML = sortProducts(products, sort).map(productCard).join('');
    const resultCount = document.querySelector('[data-result-count]');
    if (resultCount) resultCount.textContent = `${products.length} products`;
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !document.querySelector('[data-product-list]') && input.value.trim()) window.location.href = `pages/category.html?q=${encodeURIComponent(input.value.trim())}`;
  });
}
function initSorting() {
  const select = document.querySelector('[data-sort-select]');
  const listing = document.querySelector('[data-product-list]');
  if (!select || !listing) return;
  select.addEventListener('change', () => {
    const category = listing.dataset.category;
    const query = document.querySelector('[data-search-input]')?.value || '';
    let products = searchProducts(query).filter((product) => !category || product.category === category);
    listing.innerHTML = sortProducts(products, select.value).map(productCard).join('');
    const resultCount = document.querySelector('[data-result-count]');
    if (resultCount) resultCount.textContent = `${products.length} products`;
  });
}
