import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRODUCTS,
  Product,
  filterProducts,
  calculateCartTotals,
  validateWholesaleInquiry,
  generateInquiryRef,
  addProduct,
  updateProduct,
  deleteProduct,
  validateProductForm,
  formatPKR
} from './catalog.js';

test('formatPKR formats amounts properly into PKR currency format', () => {
  assert.equal(formatPKR(0), 'PKR 0');
  assert.equal(formatPKR(42500), 'PKR 42,500');
  assert.equal(formatPKR(1500), 'PKR 1,500');
  assert.equal(formatPKR(250000), 'PKR 250,000');
});

test('filterProducts filters by category correctly including Women’s Fashion', () => {
  const womenItems = filterProducts(PRODUCTS, { category: "Women's Fashion" });
  assert.ok(womenItems.length >= 5);
  for (const item of womenItems) {
    assert.equal(item.category, "Women's Fashion");
  }

  const jackets = filterProducts(PRODUCTS, { category: 'Coats & Jackets' });
  assert.ok(jackets.length > 0);
  for (const item of jackets) {
    assert.equal(item.category, 'Coats & Jackets');
  }

  const all = filterProducts(PRODUCTS, { category: 'All' });
  assert.equal(all.length, PRODUCTS.length);
});

test('filterProducts searches across title, category and description', () => {
  const cashmereSearch = filterProducts(PRODUCTS, { searchQuery: 'cashmere' });
  assert.ok(cashmereSearch.length >= 1);
  assert.ok(cashmereSearch[0].name.toLowerCase().includes('cashmere') || cashmereSearch[0].description.toLowerCase().includes('cashmere'));

  const emptySearch = filterProducts(PRODUCTS, { searchQuery: 'nonexistent-query-xyz' });
  assert.equal(emptySearch.length, 0);
});

test('filterProducts sorts by price ascending and descending', () => {
  const asc = filterProducts(PRODUCTS, { sortBy: 'price-asc' });
  for (let i = 0; i < asc.length - 1; i++) {
    assert.ok(asc[i].retailPrice <= asc[i + 1].retailPrice);
  }

  const desc = filterProducts(PRODUCTS, { sortBy: 'price-desc' });
  for (let i = 0; i < desc.length - 1; i++) {
    assert.ok(desc[i].retailPrice >= desc[i + 1].retailPrice);
  }
});

test('calculateCartTotals calculates accurate subtotal, shipping and free shipping threshold in PKR', () => {
  const p1 = PRODUCTS[0];
  const p2 = PRODUCTS[1];

  const singleItem = [{ product: p2, selectedColor: p2.colors[0], selectedSize: p2.sizes[0], quantity: 1 }];
  const totals1 = calculateCartTotals(singleItem, 35000);
  assert.equal(totals1.subtotal, p2.retailPrice);
  assert.equal(totals1.totalItemCount, 1);
  assert.equal(totals1.shipping, p2.retailPrice >= 35000 ? 0 : 1500);
  assert.equal(totals1.total, p2.retailPrice + totals1.shipping);

  const doubleItem = [
    { product: p1, selectedColor: p1.colors[0], selectedSize: p1.sizes[0], quantity: 1 },
    { product: p2, selectedColor: p2.colors[0], selectedSize: p2.sizes[0], quantity: 1 }
  ];
  const expectedSubtotal = p1.retailPrice + p2.retailPrice;
  const totals2 = calculateCartTotals(doubleItem, 35000);
  assert.equal(totals2.subtotal, expectedSubtotal);
  assert.equal(totals2.totalItemCount, 2);
  assert.equal(totals2.shipping, expectedSubtotal >= 35000 ? 0 : 1500);
  assert.equal(totals2.total, expectedSubtotal + totals2.shipping);
});

test('validateWholesaleInquiry detects missing required fields and validates good submissions', () => {
  const invalidResult = validateWholesaleInquiry({});
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);

  const validResult = validateWholesaleInquiry({
    fullName: 'David Lin',
    businessName: 'Nordic Apparel Store',
    contactMethod: 'email',
    contactValue: 'david@example.com',
    category: 'Winter Wear',
    estimatedQuantity: '150 units',
    message: 'Interested in winter parka jackets for next season store order.'
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('addProduct, updateProduct, and deleteProduct manage catalog properly', () => {
  const initial = [...PRODUCTS];
  const testProduct: Product = {
    id: 'bs-test-99',
    name: 'Test Minimalist Silk Shirt',
    category: "Women's Fashion",
    retailPrice: 15500,
    wholesaleTiers: [{ moq: 10, pricePerUnit: 9500 }],
    colors: ['White', 'Navy'],
    sizes: ['S', 'M', 'L'],
    description: 'Test high quality silk shirt from Hangzhou.',
    material: '100% Mulberry Silk',
    origin: 'Hangzhou Silk District',
    visualType: 'sweater'
  };

  // Add
  const afterAdd = addProduct(initial, testProduct);
  assert.equal(afterAdd.length, initial.length + 1);
  assert.equal(afterAdd[0].id, 'bs-test-99');

  // Update
  const afterUpdate = updateProduct(afterAdd, 'bs-test-99', { retailPrice: 16500 });
  const updatedItem = afterUpdate.find(p => p.id === 'bs-test-99');
  assert.equal(updatedItem?.retailPrice, 16500);

  // Delete
  const afterDelete = deleteProduct(afterUpdate, 'bs-test-99');
  assert.equal(afterDelete.length, initial.length);
  assert.equal(afterDelete.find(p => p.id === 'bs-test-99'), undefined);
});

test('validateProductForm verifies required admin product fields', () => {
  const invalid = validateProductForm({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.retailPrice);
  assert.ok(invalid.errors.description);

  const valid = validateProductForm({
    name: 'Suede Minimalist Bomber',
    category: 'Coats & Jackets',
    retailPrice: 32000,
    description: 'Supple goat suede jacket with ribbed hem and storm collar.',
    material: '100% Genuine Goat Suede',
    origin: 'Zhejiang Leather Guild'
  });
  assert.equal(valid.isValid, true);
});
