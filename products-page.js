document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('products-grid');
  const titleEl = document.getElementById('products-title') || { textContent: '' };
  if (!grid) return;

  const CAT_TITLES = {
    keyboard: 'کیبورد',
    percussion: 'کوبه‌ای',
    wind: 'بادی',
    string: 'زهی',
    iranian: 'ساز سنتی',
    guitar: 'گیتار'
  };

  const cat = new URLSearchParams(location.search).get('category');

  try {
    const products = await getProducts();
    const list = cat ? products.filter(p => p.categorySlug === cat) : products;

    titleEl.textContent = cat && CAT_TITLES[cat] ? `محصولات ${CAT_TITLES[cat]}` : 'همه محصولات';

    if (!list.length) {
      grid.innerHTML = `
        <div class="card" style="grid-column:1/-1">
          محصولی در این دسته پیدا نشد.
          <a class="btn" href="products.html" style="margin-right:8px">مشاهده همه</a>
        </div>`;
      return;
    }
    grid.innerHTML = list.map(productCardHTML).join('');
    grid.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="add-to-cart"]');
      if (!btn) return;
      store.addItem(btn.getAttribute('data-slug'), 1);
      alert('به سبد اضافه شد ✅');
    });
  } 
  catch (err) {
    console.error(err);
    grid.innerHTML = `<div class="card"> </div>`;
  }
});
