document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const elError = document.getElementById('product-error');
  const elDetail = document.getElementById('product-detail');
  try {
    const products = await getProducts();
    const p = products.find(x => x.slug === slug);
    const img  = p.images[0];
    document.getElementById('product-image').src = img;
    document.getElementById('product-image').alt = p.title;
    document.getElementById('product-title').textContent = p.title;
    document.getElementById('product-price').textContent = formatPrice(p.price);
    document.getElementById('product-desc').textContent = p.shortDesc;
  } catch (e) {
    console.error(e);
    elError.classList.remove('hide'); elDetail.classList.add('hide');
  }
});
