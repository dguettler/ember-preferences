import Service from 'ember-preferences/service';
import MemoryStorage from 'ember-preferences/storage/memory';
import SerializableStorage from 'ember-preferences/storage/serializable';
import NamespaceableStorage from 'ember-preferences/storage/namespaceable';
import ExpirableStorage from 'ember-preferences/storage/expirable';
import DefaultableStorage from 'ember-preferences/storage/defaultable';

// FIXME: How can I test this? `window.localStorage = ...` is disabled in most browsers
// See: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function isLocalStorageAvailable() {
  var isAvailable;

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
  var storage = SerializableStorage.create({
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
  var storage;

  if (isLocalStorageAvailable()) {
    storage = localStorage(preferences.namespace)
  } else {
    storage = MemoryStorage.create();
  }

  storage = ExpirableStorage.create({
    content: storage
  });

  storage = DefaultableStorage.create({
    defaults: {},
    content: storage
  });

  container.register(
    'service:preferences',
    Service.create({ _storage: storage }),
    { instantiate: false }
  );
}

export function inject(registry) {
  // Inject the service everywhere
  ['route', 'controller', 'component'].forEach(type => {
    // FIXME: We test the registry to know if we're using ember 1.12, 1.13 or +2.0
    if (registry.inject) {
      registry.inject(type, 'preferences', 'service:preferences');
    } else {
      registry.injection(type, 'preferences', 'service:preferences')
    }
  });
}
