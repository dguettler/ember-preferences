import QUnit, { module, test } from 'qunit';
import CookieStorage from 'ember-preferences/storage/cookie';

module('Unit | Storage | cookie storage', {
  beforeEach() {
    document.cookie = 'foo=;max-age=0&bar=;max-age=0';
  }
});

QUnit.extend(QUnit.assert, {
  inCookie(key, value) {
    // jscs:disable requireObjectDestructuring
    let cookie = document.cookie;
    // jscs:enable

    this.ok(cookie.indexOf(`${key}=${encodeURIComponent(value)}`) >= 0, `Expect "${key}=${value}" to be in the cookie`);
  },

  notInCookie(key, value) {
    // jscs:disable requireObjectDestructuring
    let cookie = document.cookie;
    // jscs:enable

    this.ok(cookie.indexOf(`${key}=${encodeURIComponent(value)}`) === -1, `Expect "${key}=${value}" not to be in the cookie`);
  }
});

test('.setItem() store values', function(assert) {
  let subject = CookieStorage.create();

  assert.notInCookie('foo', 'bar');

  subject.setItem('foo', 'bar');

  assert.inCookie('foo', 'bar');
});

test('.getItem() retrieves stored value', function(assert) {
  let subject = CookieStorage.create();

  document.cookie = 'baz=qux';

  let actual = subject.getItem('baz');

  assert.equal(actual, 'qux');
});
