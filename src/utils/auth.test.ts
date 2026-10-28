import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAdminCredentials } from './auth.js';

test('validateAdminCredentials accepts correct usernames and passwords', () => {
  // admin + Banos2026!
  const res1 = validateAdminCredentials('admin', 'Banos2026!');
  assert.equal(res1.success, true);

  // admin@banos.store + admin123
  const res2 = validateAdminCredentials('admin@banos.store', 'admin123');
  assert.equal(res2.success, true);

  // dayanalam78@gmail.com
  const res3 = validateAdminCredentials('dayanalam78@gmail.com', 'Banos2026!');
  assert.equal(res3.success, true);
});

test('validateAdminCredentials rejects wrong username or password', () => {
  const badUser = validateAdminCredentials('wronguser', 'Banos2026!');
  assert.equal(badUser.success, false);
  assert.ok(badUser.error);

  const badPass = validateAdminCredentials('admin', 'wrongpass');
  assert.equal(badPass.success, false);
  assert.ok(badPass.error);

  const empty = validateAdminCredentials('', '');
  assert.equal(empty.success, false);
});
