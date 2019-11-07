/**
 * @public
 * @module ember-preferences
 */

import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

/**
 * @public
 *
 * Mixin to inject the preferences service on other injectable objects, this
 * DRYs up and gives consistency to the code.
 *
 * @class Mixin
 * @example
 *
 *   import Component from '@ember/component';
 *   import PreferencesMixin from 'ember-preferences/mixin';
 *   import { alias } from '@ember/object/computed';
 *
 *   export default Component.extend(PreferencesMixin, {
 *     foo: alias('preferences.foo')
 *   });
 */
export default Mixin.create({
  /**
   * @property preferences
   * @type {Ember.Service}
   * @public
   */
  preferences: service()
});
