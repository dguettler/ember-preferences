import Ember from 'ember';
import Decorator from './decorator';

export default Ember.Object.extend(Decorator, {
  getItem(key) {
    try {
      return this.get('content').getItem(key);
    } catch(e) {
    }
  },

  setItem(key, value) {
    try {
      return this.get('content').setItem(key, value);
    } catch(e) {
      return value;
    }
  },

  clear() {
    try {
      this.get('content').clear();
    } catch(e) {
    }
  },

  removeItem(key) {
    try {
      this.get('content').removeItem(key);
    } catch(e) {
    }
  }
});
