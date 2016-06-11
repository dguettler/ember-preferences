import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import DefaultableStore from 'ember-preferences/storage/defaultable';

let subject;
let actualStorage;

module('Unit | Storage | defaultable decorator', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = DefaultableStore.create({
      content: actualStorage,
      defaults: {
        foo: 'bar',
        baz() {
          return 'qux';
        }
      }
    });
  }
});

test('.getItem() returns default value when it is undefined', function(assert) {
  actualStorage.setItem('foo', undefined);

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.getItem() returns default value when it is null', function(assert) {
  actualStorage.setItem('foo', null);

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.getItem() returns default value when it is defined as a function', function(assert) {
  actualStorage.setItem('baz', undefined);

  assert.equal(subject.getItem('baz'), 'qux');
});

test('.getItem() returns value from underlying storage', function(assert) {
  actualStorage.setItem('foo', 'baz');

  assert.equal(subject.getItem('foo'), 'baz');
});

test('.getItem() returns undefined when there is not a default value', function(assert) {
  actualStorage.setItem('quxx', undefined);

  assert.equal(subject.getItem('quxx'), undefined);
});

test('.getItem() returns undefined when there is not a default value', function(assert) {
  actualStorage.setItem('quxx', null);

  assert.equal(subject.getItem('quxx'), null);
});
