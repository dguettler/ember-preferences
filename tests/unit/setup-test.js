import Ember from 'ember';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';
import { register, inject } from 'ember-preferences/setup';
import { module, test } from 'qunit';
import sinon from 'sinon';

var application;


function isEmber2() {
  const versionSplit = Ember.VERSION.split('.');
  const majorVersion = parseInt(versionSplit[0], 10);
  const minorVersion = parseInt(versionSplit[1], 10);

  return majorVersion === 2 && minorVersion > 0;
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
    var mock = sinon.mock(application);
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

  test('.register uses localStorage with namespaceable as the storage', function(assert) {
    register(application, { namespace: 'foo' });

    var service = application.resolveRegistration('service:preferences');

    assert.ok(service);
    assert.equal(service.get('_storage').constructor, NamespaceableStorage);
    assert.equal(service.get('_storage.content').constructor, SerializableStorage);
    assert.equal(service.get('_storage.content.content'), window.localStorage);
  });

  test('.register does not use namespaceable storage when namespaces is false', function(assert) {
    register(application, { namespace: false });

    var service = application.resolveRegistration('service:preferences');

    assert.ok(service);
    assert.equal(service.get('_storage').constructor, SerializableStorage);
    assert.equal(service.get('_storage.content'), window.localStorage);
  });
}
