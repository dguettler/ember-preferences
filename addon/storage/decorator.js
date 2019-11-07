import Mixin from '@ember/object/mixin';

export default Mixin.create({
  content: null,

  setItem(key, value) {
    return this.get('content').setItem(key, value);
  },

  getItem(key) {
    return this.get('content').getItem(key);
  },

  clear() {
    this.get('content').clear();
  },

  removeItem(key) {
    this.get('content').removeItem(key);
  }
});
