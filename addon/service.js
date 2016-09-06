/**
 * @public
 * @module ember-preferences
 */

import Ember from 'ember';

/**
 * @public
 *
 * Ember service which reads and writes configurations directly to local
 * storage.
 *
 * Note that in the future you will be able to choose the backend (local
 * storage, session storage, cookies, etc.).
 *
 * @class Service
 * @example
 *
 *   import Ember from 'ember';
 *   const { computed, inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     preferences: inject.service(),
 *     foo: computed.alias('preferences.foo')
 *   });
 *
 * @example <caption>Injecting the service with a different property name</caption>
 *
 *   import Ember from 'ember';
 *   const { inject } = Ember;
 *
 *   export default Ember.Component.extend({
 *     userOptions: inject.service('preferences'),
 *     foo: computed.alias('userOptions.foo')
 *   });
 */
export default Ember.Service.extend({
  _storage: null,

  setItem(key, value) {
    this.set(key, value);
  },

  getItem(key) {
    return this.get(key);
  },

  clear() {
    this.get('_storage').clear();
  },

  removeItem(key) {
    this.get('_storage').removeItem(key);
  },

  unknownProperty(key) {
    return this.storage().getItem(key);
  },

  setUnknownProperty(key, value) {
    this.storage().setItem(key, value);
    this.notifyPropertyChange(key);

    return value;
  },

  /**
   * @private
   */
  storage() {
    return this.get('_storage');
  }
});
