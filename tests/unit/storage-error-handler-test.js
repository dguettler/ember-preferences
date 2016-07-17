import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import ErrorHandlerStorage from 'ember-preferences/storage/error-handler';

function throwError() {
  throw new Error('an unhandled exception');
}

function errorStorage() {
  return ErrorHandlerStorage.create({
    content: {
      setItem: throwError,
      getItem: throwError,
      clear: throwError,
      removeItem: throwError
    }
  });
}

function regularStorage() {
  return ErrorHandlerStorage.create({
    content: MemoryStorage.create()
  });
}

module('Unit | Storage | error handler decorator');

test('.getItem() catches errors', function(assert) {
  let subject = errorStorage();

  assert.equal(subject.getItem('foo'), undefined);
});

test('.getItem() returns value', function(assert) {
  let subject = regularStorage();

  subject.get('content').setItem('foo', 'bar');

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.setItem() catches errors', function(assert) {
  let subject = errorStorage();

  assert.equal(subject.setItem('foo', 'bar'), 'bar');
});

test('.setItem() catches errors', function(assert) {
  let subject = regularStorage();

  assert.equal(subject.setItem('foo', 'bar'), 'bar');
  assert.equal(subject.get('content').getItem('foo'), 'bar');
});

test('.clear() catches errors', function(assert) {
  assert.expect(0);

  let subject = errorStorage();

  subject.clear();
});

test('.clear() clears underlaying store', function(assert) {
  let subject = regularStorage();

  subject.get('content').setItem('foo', 'bar');
  subject.clear();

  assert.equal(subject.get('content').getItem('foo'), undefined);
});

test('.removeItem() catches errors', function(assert) {
  assert.expect(0);

  let subject = errorStorage();

  subject.removeItem('foo');
});

test('.removeItem() clears key on underlaying store', function(assert) {
  let subject = regularStorage();

  subject.get('content').setItem('foo', 'bar');
  subject.removeItem('foo');

  assert.equal(subject.get('content').getItem('foo'), undefined);
});
