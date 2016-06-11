import Ember from 'ember';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';
import ExpirableStorage from 'ember-preferences/storage/expirable';
import DefaultableStorage from 'ember-preferences/storage/defaultable';
import { register, inject } from 'ember-preferences/setup';
import { module, test } from 'qunit';
import sinon from 'sinon';
import '../helpers/map-polyfill';

let application;

function isEmber2() {
  let versionSplit = Ember.VERSION.split('.');
  let majorVersion = parseInt(versionSplit[0], 10);
  let minorVersion = parseInt(versionSplit[1], 10);

  return majorVersion === 2 && minorVersion > 0;
}

function mapStorages(parent) {
  let map = new Map();
  let current = parent;

  do {
    map.set(current.constructor, current);
  } while (current = current.get && current.get('content'));

  return map;
}

function find(parent, constructor) {
  return mapStorages(parent).get(constructor);
}

if (isEmber2()) {
  module('Unit | Setup | register preferences service', {
    beforeEach() {
      Ember.run(function() {
        application = Ember.Application.create();
        application.deferReadiness();
      });
    }
  });

  test('.inject injects the service everywhere', function(assert) {
    let mock = sinon.mock(application);

    mock.expects('inject').withArgs('route', 'preferences', 'service:preferences');
    mock.expects('inject').withArgs('controller', 'preferences', 'service:preferences');
    mock.expects('inject').withArgs('component', 'preferences', 'service:preferences');

    inject(application, {});

    assert.ok(mock.verify());
  });

  test('.register configures service as non-instantiatable', function(assert) {
    register(application, {});

    assert.deepEqual(application.registeredOptions('service:preferences'), { instantiate: false });
  });

  test('resolves service:preference', function(assert) {
    register(application, { });

    let service = application.resolveRegistration('service:preferences');

    assert.ok(service);
  });

  test('.register adds namespaceable decorator', function(assert) {
    register(application, { namespace: 'foo' });

    let service = application.resolveRegistration('service:preferences');
    let decorator = find(service.get('_storage'), NamespaceableStorage);

    assert.ok(decorator);
    assert.equal(decorator.get('namespace'), 'foo');
  });

  test('.register does not use namespaceable storage when namespaces is false', function(assert) {
    register(application, { namespace: false });

    let service = application.resolveRegistration('service:preferences');
    let decorator = find(service.get('_storage'), NamespaceableStorage);

    assert.notOk(decorator);
  });

  test('.register adds expirable decorator', function(assert) {
    register(application, { });

    let service = application.resolveRegistration('service:preferences');
    let decorator = find(service.get('_storage'), ExpirableStorage);

    assert.ok(decorator);
  });

  test('.register adds serializable decorator', function(assert) {
    register(application, { });

    let service = application.resolveRegistration('service:preferences');
    let decorator = find(service.get('_storage'), SerializableStorage);

    assert.ok(decorator);
  });

  test('.register sets localStorage as the storage', function(assert) {
    register(application, { });

    let service = application.resolveRegistration('service:preferences');
    let storage = find(service.get('_storage'), SerializableStorage);

    assert.ok(storage);
  });

  test('.register adds defaultable decorator with empty defaults', function(assert) {
    register(application, { });

    let service = application.resolveRegistration('service:preferences');
    let storage = find(service.get('_storage'), DefaultableStorage);

    assert.ok(storage);
  });

  test('.register adds defaultable decorator with defaults', function(assert) {
    register(application, {
      defaults: {
        foo: 'bar'
      }
    });

    let service = application.resolveRegistration('service:preferences');
    let storage = find(service.get('_storage'), DefaultableStorage);

    assert.ok(storage);
    assert.equal(storage.get('defaults.foo'), 'bar');
  });
}
