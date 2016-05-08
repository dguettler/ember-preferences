import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';

let subject;

module('Unit | Storage | memory storage', {
  beforeEach() {
    subject = MemoryStorage.create();
  }
});

test('.setItem() and .getItem() store and retrieve values', function(assert) {
  subject.setItem('foo', 'bar');

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.clear() clears the store', function(assert) {
  subject.setItem('foo', 'bar');
  subject.clear();

  assert.equal(subject.getItem('foo'), undefined);
});

test('.removeItem() removes item', function(assert) {
  subject.setItem('foo', 'bar');
  subject.removeItem('foo');

  assert.equal(subject.getItem('foo'), undefined);
});
