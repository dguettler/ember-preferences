import Service from 'ember-preferences/service';
import MemoryStorage from 'ember-preferences/storage/memory';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';
import ExpirableStorage from 'ember-preferences/storage/expirable';
import DefaultableStorage from 'ember-preferences/storage/defaultable';
import CompressibleStorage from 'ember-preferences/storage/compressible';

// FIXME: How can I test this? `window.localStorage = ...` is disabled in most browsers
// See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function isLocalStorageAvailable() {
  let isAvailable;

  try {
    window.localStorage.setItem('ember-preferences-test', true);
    isAvailable = window.localStorage.getItem('ember-preferences-test');
    window.localStorage.removeItem('ember-preferences-test');
  } catch(error) {
    isAvailable = false;
  }

  return isAvailable;
}

function localStorage(namespace) {
  let storage = SerializableStorage.create({
    content: window.localStorage
  });

  if (namespace) {
    storage = NamespaceableStorage.create({
      namespace,
      content: storage
    });
  }

  return storage;
}

export function register(container, preferences) {
  // Configure the service
  let storage;

  if (isLocalStorageAvailable()) {
    storage = localStorage(preferences.namespace);
  } else {
    storage = MemoryStorage.create();
  }

  storage = CompressibleStorage.create({
    configuration: preferences.configuration || {},
    content: storage
  });

  storage = ExpirableStorage.create({
    expirations: preferences.expirations || {},
    content: storage
  });

  storage = DefaultableStorage.create({
    defaults: preferences.defaults || {},
    content: storage
  });

  container.register(
    'service:preferences',
    Service.create({ _storage: storage }),
    { instantiate: false }
  );
}
