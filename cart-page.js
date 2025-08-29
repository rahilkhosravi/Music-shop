const SHIPPING = 20000;

document.addEventListener('DOMContentLoaded', async () => {
  const rows   = document.getElementById('cart-rows');
  const empty  = document.getElementById('cart-empty');
  const filled = document.getElementById('cart-filled');

  const products = await getProducts();               
  const map = new Map(products.map(p => [p.slug, p]));  

  function setState() {
    const has = store.getItems().length > 0;
    empty.classList.toggle('hide', has);
    filled.classList.toggle('hide', !has);
  }

  function render() {
    const cartItems = store.getItems();

    if (!cartItems.length) {
      rows.innerHTML = '';
      document.getElementById('cart-subtotal').textContent = '—';
      document.getElementById('cart-shipping').textContent = '—';
      document.getElementById('cart-total').textContent    = '—';
      setState();
      return;
    }

    let subtotal = 0;
    rows.innerHTML = cartItems.map(ci => {
      const p = map.get(ci.slug);
      const img = p.images[0];                        
      const line = p.price * ci.qty;
      subtotal += line;
      return `
        <tr data-slug="${p.slug}">
          <td style="text-align:right">
            <img src="${img}" alt="${p.title}"
                 style="width:60px;height:45px;object-fit:contain;vertical-align:middle;margin-left:8px;">
            ${p.title}
          </td>
          <td>${formatPrice(p.price)}</td>
          <td><input type="number" min="1" value="${ci.qty}" class="qty-input"
                     style="width:60px;text-align:center"></td>
          <td><button class="btn" data-action="remove">حذف</button></td>
        </tr>
      `;
    }).join('');

    document.getElementById('cart-subtotal').textContent = formatPrice(subtotal);
    document.getElementById('cart-shipping').textContent = formatPrice(SHIPPING);
    document.getElementById('cart-total').textContent    = formatPrice(subtotal + SHIPPING);
    setState();
  }

  rows.addEventListener('input', (e) => {
    const input = e.target.closest('.qty-input'); if (!input) return;
    const slug = e.target.closest('tr').getAttribute('data-slug');
    store.updateQty(slug, Number(input.value));
    render();
  });

  rows.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="remove"]'); if (!btn) return;
    const slug = e.target.closest('tr').getAttribute('data-slug');
    store.removeItem(slug);
    render();
  });

  render();
});
