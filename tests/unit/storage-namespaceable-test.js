import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';

var subject,
    actualStorage;

module('Unit | Storage | namespaceable decorator', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = NamespaceableStorage.create({ content: actualStorage, namespace: 'abc' });
  }
});

test('.setItem() appends namespace to key', function(assert) {
  subject.setItem('foo', 'bar');

  assert.equal(actualStorage.getItem('abc:foo'), 'bar');
});

test('.setItem() ignores undefined namespace', function(assert) {
  subject.set('namespace', undefined);
  subject.setItem('foo', 'bar');

  assert.equal(actualStorage.getItem('foo'), 'bar');
});

test('.setItem() ignores null namespace', function(assert) {
  subject.set('namespace', null);
  subject.setItem('foo', 'bar');

  assert.equal(actualStorage.getItem('foo'), 'bar');
});

test('.getItem() removes namespace when reading a configuration', function(assert) {
  actualStorage.setItem('abc:bar', 'baz');

  assert.equal(subject.getItem('bar'), 'baz');
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
