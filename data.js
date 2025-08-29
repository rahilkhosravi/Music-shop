async function getProducts() {
  const res = await fetch('data/products.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('error');
  // console.log('[getProducts]', data.length);
  return await res.json();
}
