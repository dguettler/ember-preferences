/**
 * @public
 * @module ember-preferences
 */

import Service from '@ember/service';

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
 *   import Component from '@ember/component';
 *   import { alias } from '@ember/object/computed';
 *   import { inject as service } from '@ember/service';
 *
 *   export default Ember.Component.extend({
 *     preferences: service(),
 *     foo: alias('preferences.foo')
 *   });
 *
 * @example <caption>Injecting the service with a different property name</caption>
 *
 *   import Component from '@ember/component';
 *   import { alias } from '@ember/object/computed';
 *   import { inject as service } from '@ember/service';
 *
 *   export default Ember.Component.extend({
 *     userOptions: service('preferences'),
 *     foo: alias('userOptions.foo')
 *   });
 */
export default Service.extend({
  _storage: null,

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
