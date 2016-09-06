import { module, test } from 'qunit';
import MemoryStorage from 'ember-preferences/storage/memory';
import CompressibleStorage from 'ember-preferences/storage/compressible';
/* global LZString */

let subject;
let actualStorage;

module('Unit | Storage | compressible decorator', {
  beforeEach() {
    actualStorage = MemoryStorage.create();
    subject = CompressibleStorage.create({
      content: actualStorage,
      configuration: {
        foo: {
          compression: true
        },
        baz: {
          compression: false
        }
      }
    });
  }
});

test('.getItem() retrieves compressed values', function(assert) {
  actualStorage.setItem('foo', LZString.compressToUTF16('lorem ipsum'));

  assert.equal(subject.getItem('foo'), 'lorem ipsum');
});

test('.getItem() retrieves non compressed values', function(assert) {
  actualStorage.setItem('bar', 'lorem ipsum');
  actualStorage.setItem('baz', 'lorem ipsum');

  assert.equal(subject.getItem('bar'), 'lorem ipsum');
  assert.equal(subject.getItem('baz'), 'lorem ipsum');
});

test('.setItem() stores compressed values', function(assert) {
  subject.setItem('foo', 'lorem ipsum');

  assert.equal(actualStorage.getItem('foo'), LZString.compressToUTF16('lorem ipsum'));
});

test('.setItem() stores uncompressed values', function(assert) {
  subject.setItem('bar', 'lorem ipsum');
  subject.setItem('baz', 'lorem ipsum');

  assert.equal(actualStorage.getItem('bar'), 'lorem ipsum');
  assert.equal(actualStorage.getItem('baz'), 'lorem ipsum');
});
