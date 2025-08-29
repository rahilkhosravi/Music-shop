(function () {
  if (window.store) return;
  const KEY = 'musicshop_cart';
  const read  = () => JSON.parse(localStorage.getItem(KEY)) || [];
  const write = (cart) => localStorage.setItem(KEY, JSON.stringify(cart));

  window.store = {
    addItem(slug, qty = 1) {
      const cart = read();
      const it = cart.find(i => i.slug === slug);
      if (it) {
        it.qty += qty;
      } else {
        cart.push({ slug, qty });
      }
      write(cart);
    },
    updateQty(slug, qty) {
      const cart = read();
      const it = cart.find(i => i.slug === slug);
      it.qty = Number(qty);
      write(cart);
    },
    removeItem(slug) {
      const cart = read().filter(i => i.slug !== slug);
      write(cart);
    },
    getItems() {
      return read();
    },
    clear() {
      write([]);
    }
  };
})();
