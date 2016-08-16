/**
 * @public
 * @module ember-preferences
 */

import Ember from 'ember';
import { expirable } from 'ember-preferences/storage/expirable';

function calculateValue(target, value, options) {
  if (typeof value === 'undefined' || value === null) {
    if (typeof options.defaultValue === 'function') {
      return options.defaultValue.call(target);
    } else {
      return options.defaultValue;
    }
  }

  return value;
}

/**
 * @public
 *
 * Computed property which extends the capabilities of a preference key by
 * adding the possibility of returning a default value.
 *
 * When the computed property is set the value is automatically stored in the
 * preference store.
 *
 * When `null` or `undefined` is set the computed property returns its default
 * value.
 *
 * @example
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar')
 *   });
 *
 * @example <caption>With default values</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar', { defaultValue: 'hello world!' })
 *   });
 *
 * @example <caption>With a function as default value</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preferences/computed';
 *
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: preference('bar', { defaultValue() { return ['an', 'array']; } })
 *   });
 *
 * @example <caption>With expiration date</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preference/computed';
 *
 *   const ONE_DAY = 1 * 60 * 60 * 1000;
 *
 *   export default Ember.Component.extend({
 *     foo: preference('bar', { expires() { return +new Date() + ONE_DAY; } })
 *   });
 *
 * @example <caption>Optional dependentKey</caption>
 *
 *   import Ember from 'ember';
 *   import preference from 'ember-preference/computed';
 *
 *   export default Ember.Component.extend({
 *     // `foo` is going to be used as the dependentKey
 *     foo: preference(),
 *
 *     // `bar` is going to be used as the dependentKey
 *     bar: preference({ defaultValue: 'qux' })
 *   });
 *
 * @param {String|Object} dependentKey - Key from preferences to subscribe to. If a key is not provided then a hash with options can be passed.
 * @param {Object} options - Additional options
 * @param {Function|Any} options.defaultValue - Default value to return when the preference value is null or undefined
 * @param {Function} options.expires - Function that returns the absolute expiration date - time in milliseconds since the UNIX epoch
 * @return {Ember.ComputedProperty}
 */
export default function preference(dependentKey, options) {
  if (typeof (dependentKey) === 'object') {
    options = dependentKey;
    dependentKey = null;
  }

  options = options || {};

  let cp = new Ember.ComputedProperty({
    get(key) {
      let { preferencesKey } = this.constructor.metaForProperty(key);
      let value = this.get(preferencesKey);

      return calculateValue(this, value, options);
    },

    set(key, value) {
      let { preferencesKey } = this.constructor.metaForProperty(key);

      if (typeof options.expires === 'function') {
        value = expirable(options.expires(), value);
      }

      this.set(preferencesKey, value);

      return calculateValue(this, value, options);
    }
  });

  // We need to define the dependent key when the compute property is being
  // setup so we know the property key name used.
  //
  // The `setup` hook is defined in the `Descriptor` class.
  // See https://github.com/emberjs/ember.js/blob/38514aaa55b2bf088f61c90f3889906d944b5693/packages/ember-metal/lib/properties.js#L161
  cp.setup = function(target, targetKey) {
    let key = `preferences.${dependentKey || targetKey}`;

    this.property(key);
    this.meta({ preferencesKey: key });
  };

  return cp;
}
