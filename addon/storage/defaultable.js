import Ember from 'ember';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default Ember.Object.extend(DecoratorMixin, {
  getItem(key) {
    return this.calculateValue(key, this._super(key));
  },

  calculateValue(key, value) {
    if (value === undefined || value === null) {
      value = this.get('defaults')[key];

      if (typeof value === 'function') {
        value = value();
      }
    }

    return value;
  }
});
