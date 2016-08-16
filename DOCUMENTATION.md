# Documentation

- [Installation](#installation)
- [Preferences as a service](#preferences-as-a-service)
- [Preferences as a mixin](#preferences-as-a-mixin)
- [Computed property](#computed-property)
- [Shared state](#shared-state)
- [Customizations](#customizations)
  - [Namespace](#namespace)
  - [Global default values](#global-default-values)
  - [Global expiration values](#global-expiration-values)

## Installation

```js
$ ember install ember-preferences
```

## Preferences as a service

The addon provides an ember service which reads and writes configurations
directly to local storage. If local storage is not available then the
configurations are kept in memory for the duration of the session.

__In the future you will be able to choose the backend (local storage, session storage, cookies, etc.).__

The service is already registered in the application container so it's ready to be injected on any object.

```js
import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  preferences: inject.service(),
  foo: computed.alias('preferences.foo')
});
```

You can also inject the service with a different property name

```js
import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  userOptions: inject.service('preferences'),
  foo: computed.alias('userOptions.foo')
});
```

Where `foo` is a property which will be written and read from local storage.

## Preferences as a mixin

You can use a mixin to inject the `preferences` service, this DRYs up and gives
consistency to the code.

```js
import Ember from 'ember';
import PreferencesMixin from 'ember-preferences/mixin';

const { computed } = Ember;

export default Ember.Component.extend(PreferencesMixin, {
  foo: computed.alias('preferences.foo')
});
```

## Computed property

The addon provides a computed property which extends the capabilities of a preference key by adding the possibility of returning a default value.

__Without default value__

```js
import Ember from 'ember';
import preference from 'ember-preferences/computed';

const { inject } = Ember;

export default Ember.Component.extend({
  preferences: inject.service(),
  foo: preference('bar')
});
```

The property `foo` will read and write the preference value from `preferences.bar` (like if it was a `Ember.computed.alias('preferences.bar')`).

__With default value__

```js
import Ember from 'ember';
import preference from 'ember-preferences/computed';

const { inject } = Ember;

export default Ember.Component.extend({
  preferences: inject.service(),
  foo: preference('bar', { defaultValue: 'hello world!' })
});
```

The default value will be returned when the preference is `null` or `undefined`.

You can use a function to generate the default value on first access, useful to
return mutable objects.

```js
import Ember from 'ember';
import preference from 'ember-preferences/computed';

const { inject } = Ember;

export default Ember.Component.extend({
  preferences: inject.service(),
  foo: preference('bar', { defaultValue() { return ['an', 'array']; } })
});
```

__With expiration date__

```js
import Ember from 'ember';
import preference from 'ember-preference/computed';

const ONE_DAY = 1 * 60 * 60 * 1000;

export default Ember.Component.extend({
  foo: preference('bar', { expires() { return +new Date() + ONE_DAY; } })
});
```

When a value is written it will remain valid for one day. After that time the
configuration will return it's default value or null.

__Omit preference name__

You can optionally omit the preference name in which case the name of the
property will be used.

```js
import Ember from 'ember';
import preference from 'ember-preference/computed';

export default Ember.Computed.extend({
  foo: preference({ defaultValue: 'bar' });
});
```

The property `foo` will read and write the preference value from `preferences.foo`.

## Shared state

Configuration values are shared across the entire application. If, for example,
you declare `preferences('foo')` on two different components, the same value
will be read and write from the storage, in conclusion the state is shared. If
you don't want this behavior, use a unique name for each preference.

## Customizations

You can customize preferences behavior by creating `app/preferences.js` file.

### Namespace

Preferences are stored in local storage using the application name as the
namespace for each key. You can change this behavior by placing a `preferences.js`
file in the `app/` folder.

First, add a new `app/preferences.js` file to your project with the following
content.

```js
export default function() {
  return {};
}
```

To change the namespace you need to define the `namespace` property as follows

```js
export default function() {
  return {
    namespace: 'foo'
  };
}
```

Now every preference will be prefixed with `foo:` string.

You can disable the use of namespace by returning a falsy value

```js
export default function() {
  return {
    namespace: false // disables namespace
  };
}
```

### Global default values

You can configure default values for some keys by adding a map in the
preferences configuration file.

```js
export default function() {
  return {
    defaults: {
      foo: 'bar'
    }
  };
}
```

### Global expiration values

You can configure expiration times for some keys by adding a map in the
preferences configuration file.

```js
export default function() {
  return {
    expirations: {
      foo() {
        // one second in the future
        return (+new Date()) + 1000;
      }
    }
  };
}
```
