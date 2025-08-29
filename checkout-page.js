const SHIPPING_COST = 20000;

document.addEventListener('DOMContentLoaded', async () => {

  const form    = document.getElementById('checkout-form');
  const listBox = document.getElementById('checkout-items');
  const subEl   = document.getElementById('co-subtotal');
  const shipEl  = document.getElementById('co-shipping');
  const totEl   = document.getElementById('co-total');

  const nameEl  = document.getElementById('cf-name');
  const addrEl  = document.getElementById('cf-address');

  const setErr   = (id, msg) => { const el = document.getElementById(id); if (el) el.textContent = msg; };
  const clearErr = (id)      => { const el = document.getElementById(id); if (el) el.textContent = '';  };

  const products = await getProducts();
  const items    = store.getItems();
  const map      = new Map(products.map(p => [p.slug, p]));

  // خلاصهٔ سفارش
  let subtotal = 0;
  listBox.innerHTML = items.map(ci => {
    const p = map.get(ci.slug);
    const line = p.price * ci.qty;
    subtotal += line;
    return `
      <div class="summary-line">
        <span>${p.title} × ${ci.qty}</span>
        <strong>${formatPrice(line)}</strong>
      </div>`;
  }).join('');

  subEl.textContent  = formatPrice(subtotal);
  shipEl.textContent = formatPrice(SHIPPING_COST);
  totEl.textContent  = formatPrice(subtotal + SHIPPING_COST);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameEl.value.trim();
    const addr = addrEl.value.trim();

    let valid = true;
    if (!name) { setErr('err-name', 'الزامی'); valid = false; nameEl.focus(); }
    else { clearErr('err-name'); }
    if (!addr) { setErr('err-address', 'الزامی'); valid = false; if (name) addrEl.focus(); }
    else { clearErr('err-address'); }
    if (!valid) return; 
    const orderId = Math.floor(100000 + Math.random() * 900000);
    store.clear();
    location.href = `success.html?orderId=${orderId}`;
  });
});
