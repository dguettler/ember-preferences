import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import SerializableStore from 'ember-preferences/storage/serializable';

let subject;
let actualStorage;

module('Unit | Storage | serializable decorator', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = SerializableStore.create({ content: actualStorage });
  }
});

test('.setItem() serializes objects', function(assert) {
  subject.setItem('foo', { bar: 'baz' });

  assert.equal(actualStorage.getItem('foo'), '{"bar":"baz"}');
});

test('.setItem() does not serialize undefined values', function(assert) {
  subject.setItem('foo', undefined);

  assert.equal(actualStorage.getItem('foo'), undefined);
});

test('.setItem() does not serialize null values', function(assert) {
  subject.setItem('foo', undefined);

  assert.equal(actualStorage.getItem('foo'), undefined);
});

test('.getItem() deserializes objects', function(assert) {
  actualStorage.setItem('foo', '{"bar":"baz"}');

  assert.deepEqual(subject.getItem('foo'), { bar: 'baz' });
});

test('.getItem() does not try to deserialize undefined values', function(assert) {
  assert.deepEqual(subject.getItem('foo'), undefined);
});

test('.getItem() does not try to deserialize null values', function(assert) {
  actualStorage.setItem('foo', null);

  assert.deepEqual(subject.getItem('foo'), null);
});

test('.clears() clears the store', function(assert) {
  subject.setItem('foo', { bar: 'baz' });
  subject.clear();

  assert.equal(subject.getItem('foo'), undefined);
});

test('.removeItem() removes item', function(assert) {
  subject.setItem('foo', 'bar');
  subject.removeItem('foo');

  assert.equal(subject.getItem('foo'), undefined);
});

test('.setItem() stores numbers', function(assert) {
  subject.setItem('foo', 100);

  assert.equal(subject.getItem('foo'), 100);
});

test('.setItem() stores strings', function(assert) {
  subject.setItem('foo', 'baz');
  subject.setItem('bar', '100');

  assert.equal(subject.getItem('foo'), 'baz');
  assert.equal(subject.getItem('bar'), '100');
});
