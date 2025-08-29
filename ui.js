(function () {
  function formatPrice(n) {
    const num = Number(n);
    if (!isFinite(num)) return String(n) + 'ریال';
    try {
      return num.toLocaleString('fa-IR') + 'ریال';
    } catch {
      return String(num) + 'ریال';
    }
  }
  function productCardHTML(p) {
   const img   = p.images[0];
   const title = p.title;
   const price = p.price;
   const slug  = p.slug;
   return (
     `<article class="product-card">
       <img src="${img}" alt="${title}">
       <h3>${title}</h3>
       <p class="price">${formatPrice(price)}</p>
       <div class="actions">
         <a class="btn" href="product.html?slug=${slug}">
         مشاهده جزئیات
         </a>
         <button class="btn btn-primary" data-action="add-to-cart" data-slug="${slug}">
           افزودن به سبد
         </button>
       </div>
     </article>`
  );
  }
  window.formatPrice = formatPrice;
  window.productCardHTML = productCardHTML;
  window.infoCardHTML = infoCardHTML;
})();
