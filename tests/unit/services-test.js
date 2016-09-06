import Ember from 'ember';
import { module, test } from 'qunit';
import Service from 'ember-preferences/service';
/* global localStorage */

const { computed } = Ember;

module('Unit | Service | preferences', {
  beforeEach() {
    localStorage.clear();
  }
});

test('store preference in local storage', function(assert) {
  let service = Service.create({ _storage: localStorage });
  service.set('foo', 'bar');

  assert.equal(localStorage.getItem('foo'), 'bar');
});

test('fetch preference from local storage', function(assert) {
  let service = Service.create({ _storage: localStorage });
  localStorage.setItem('baz', 'qux');

  assert.equal(service.get('baz'), 'qux');
});

test('notifies when a property changes', function(assert) {
  let service = Service.create({ _storage: localStorage });
  let object = Ember.Object.create({
    preferences: service,
    bar: computed.alias('preferences.foo')
  });

  assert.equal(object.get('bar'), null);

  service.set('foo', 'baz');

  assert.equal(object.get('bar'), 'baz');
});

test('.setItem() stores a value', function(assert) {
  let service = Service.create({ _storage: localStorage });
  service.setItem('foo', 'bar');

  assert.equal(localStorage.getItem('foo'), 'bar');
});

test('.getItem() retrieves a value', function(assert) {
  let service = Service.create({ _storage: localStorage });
  localStorage.setItem('baz', 'qux');

  assert.equal(service.getItem('baz'), 'qux');
});

test('.clear() clears the store', function(assert) {
  let service = Service.create({ _storage: localStorage });
  service.setItem('baz', 'qux');
  service.clear();

  assert.equal(service.getItem('baz'), undefined);
});

test('.removeItem() removes item', function(assert) {
  let service = Service.create({ _storage: localStorage });
  service.setItem('foo', 'bar');
  service.setItem('baz', 'qux');
  service.removeItem('baz');

  assert.equal(service.getItem('foo'), 'bar');
  assert.equal(service.getItem('baz'), undefined);
});
