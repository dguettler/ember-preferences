import EmberObject from '@ember/object';
import { computed } from '@ember/object';

export default EmberObject.extend({
  db: computed(function() {
    return EmberObject.create();
  }),

  setItem(key, value) {
    return this.get('db').set(key, value);
  },

  getItem(key) {
    return this.get('db').get(key);
  },

  clear() {
    this.set('db', EmberObject.create());
  },

  removeItem(key) {
    this.get('db').set(key, undefined);
  }
});
