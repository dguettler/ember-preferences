import EmberObject from '@ember/object';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default EmberObject.extend(DecoratorMixin, {
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
