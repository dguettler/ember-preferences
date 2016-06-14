import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import ExpirableStorage, { expirable, isExpirable } from 'ember-preferences/storage/expirable';

let subject;
let actualStorage;

function oneSecondInTheFuture() {
  return (+new Date()) + 1000;
}

function oneSecondInThePast() {
  return (+new Date()) - 1000;
}

module('Unit | Storage | expirable decorator', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = ExpirableStorage.create({
      content: actualStorage,
      expirations: {
        qux() {
          return oneSecondInTheFuture();
        },

        quxx() {
          return oneSecondInThePast();
        }
      }
    });
  }
});

test('.getItem() retrieves regular values', function(assert) {
  subject.setItem('foo', 'bar');

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.getItem() retrieves unexpired values', function(assert) {
  subject.setItem('foo', expirable(oneSecondInTheFuture(), 'bar'));

  assert.equal(subject.getItem('foo'), 'bar');
});

test('.getItem() does not retrieve expired values', function(assert) {
  subject.setItem('foo', expirable(oneSecondInThePast(), 'bar'));

  assert.equal(subject.getItem('foo'), undefined);
});

test('.setItem() applies expiration date to configured values', function(assert) {
  subject.setItem('qux', 'bar');
  subject.setItem('quxx', 'bar');

  // both values are expirables
  assert.ok(isExpirable(actualStorage.getItem('qux')));
  assert.ok(isExpirable(actualStorage.getItem('quxx')));

  // only one value is valid
  assert.equal(subject.getItem('qux'), 'bar');
  assert.equal(subject.getItem('quxx'), undefined);
});
