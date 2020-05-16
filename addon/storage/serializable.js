import EmberObject from '@ember/object';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default EmberObject.extend(DecoratorMixin, {
  setItem(key, value) {
    return this._super(key, JSON.stringify(value));
  },

  getItem(key) {
    let value = this._super(key);

    if (typeof (value) === 'undefined' || value === null || value === '') {
      return value;
    }

    return JSON.parse(value);
  }
});
