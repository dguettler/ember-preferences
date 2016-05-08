import Ember from 'ember';
import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import DecoratorStoreMixin from 'ember-preferences/storage/decorator';

let subject;
let actualStorage;

module('Unit | Storage | decorator mixin', {
  beforeEach() {
    let decorator = Ember.Object.extend(DecoratorStoreMixin);

    actualStorage = MemoryStorage.create();
    subject = decorator.create({ content: actualStorage });
  }
});

test('.setItem() stores values', function(assert) {
  subject.setItem('foo', 'bar');

  assert.equal(actualStorage.getItem('foo'), 'bar');
});

test('.getItem() retrieves values', function(assert) {
  actualStorage.setItem('bar', 'baz');

  assert.equal(subject.getItem('bar'), 'baz');
});

test('.clear() clears the store', function(assert) {
  actualStorage.setItem('foo', 'bar');

  subject.clear();

  assert.equal(actualStorage.getItem('foo'), undefined);
});

test('.removeItem() removes item', function(assert) {
  actualStorage.setItem('foo', 'bar');

  subject.removeItem('foo');

  assert.equal(actualStorage.getItem('foo'), undefined);
});
