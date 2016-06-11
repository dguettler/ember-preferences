import Ember from 'ember';

const { computed } = Ember;

export default Ember.Object.extend({
  db: computed(function() {
    return Ember.Object.create();
  }),

  setItem(key, value) {
    return this.get('db').set(key, value);
  },

  getItem(key) {
    return this.get('db').get(key);
  },

  clear() {
    this.set('db', Ember.Object.create());
  },

  removeItem(key) {
    this.get('db').set(key, undefined);
  }
});
