import Ember from 'ember';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default Ember.Object.extend(DecoratorMixin, {
  setItem(key, value) {
    return this._super(key, JSON.stringify(value));
  },

  getItem(key) {
    let value = this._super(key);

    if (typeof (value) === 'undefined' || value === null) {
      return value;
    }

    return JSON.parse(value);
  }
});
