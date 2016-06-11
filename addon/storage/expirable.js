import Ember from 'ember';
import DecoratorMixin from 'ember-preferences/storage/decorator';

/**
 * @private
 */
export function isExpirable(value) {
  return typeof(value) === 'object' && value !== null && value.type === 'expirable';
}

/**
 * @private
 */
export function isExpired(time) {
  return typeof(time.expirationTime) === 'number' && (+new Date()) > time.expirationTime;
}

/**
 * Creates a new expirable value
 *
 * @param {Number} expirationTime - absolute time in milliseconds since UNIX epoch
 * @param {Any} value - value to store
 * @return {Object}
 */
export function expirable(expirationTime, value) {
  return {
    type: 'expirable',
    expirationTime,
    value
  };
}

export default Ember.Object.extend(DecoratorMixin, {
  getItem(key) {
    var obj = this._super(key);

    if (isExpirable(obj)) {
      if (isExpired(obj)) {
        this.removeItem(key);
        return;
      }

      return obj.value;
    }

    return obj;
  },

  setItem(key, value) {
    this._super(key, this.wrapValue(key, value));

    return value;
  },

  wrapValue(key, value) {
    if (this.get('expirations')[key]) {
      return expirable(this.get('expirations')[key], value);
    } else {
      return value;
    }
  }
});
