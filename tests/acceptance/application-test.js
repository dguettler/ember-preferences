import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ombu from 'ember-ombu';
/* global localStorage */

const page = Ombu.create({
  visit: '/',

  simple: {
    scope: '.simple-value',
    text: 'h2',
    btn: 'button'
  },

  complex: {
    scope: '.complex-value',
    text: 'h2',
    btn: 'button'
  }
});

function text(selector) {
  return find(selector).text();
}

moduleForAcceptance('Acceptance | application', {
  beforeEach() {
    localStorage.clear();
  },

  afterEach() {
    delete window.preferenceFixture;
  }
});

test('reads and writes to local storage, even complex values', function(assert) {
  visit(page);

  andThen(function() {
    assert.equal(text(page.simple.text), 'Hello World!');
  });

  click(page.simple.btn);

  andThen(function() {
    assert.equal(localStorage.getItem('dummy:title'), '"Hey Hey! Bye bye"');
  });

  click(page.complex.btn);

  andThen(function() {
    assert.equal(text(page.complex.text), 'Complex value!');
  });
});

moduleForAcceptance('Acceptance | application', {
  setConfiguration() {
    window.preferenceFixture = {
      namespace: 'foo'
    };
  },

  beforeEach() {
    localStorage.clear();
  },

  afterEach() {
    delete window.preferenceFixture;
  }
});

test('configures namespace', function(assert) {
  visit(page);
  click(page.simple.btn);

  andThen(function() {
    assert.equal(localStorage.getItem('foo:title'), '"Hey Hey! Bye bye"');
  });
});
