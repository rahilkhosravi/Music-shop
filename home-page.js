document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cat-grid');

  const CATS = [
    { fa: 'کیبورد',   slug: 'keyboard',   emoji: '🎹' },
    { fa: 'کوبه‌ای',   slug: 'percussion',  emoji: '🥁' },
    { fa: 'بادی',     slug: 'wind',       emoji: '🎺' },
    { fa: 'زهی',      slug: 'string',     emoji: '🎻' },
    { fa: 'ساز سنتی', slug: 'iranian',    emoji: '🪕' },
    { fa: 'گیتار',    slug: 'guitar',     emoji: '🎸' }
  ];

  grid.innerHTML = CATS.map(c => `
    <a class="cat-card" href="products.html?category=${c.slug}">
      <div class="cat-emoji">${c.emoji}</div>
      <div class="cat-title">${c.fa}</div>
    </a>
  `).join('');
});
