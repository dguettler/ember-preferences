import EmberObject from '@ember/object';
import DecoratorMixin from 'ember-preferences/storage/decorator';

/**
 * @private
 */
export function isExpirable(value) {
  return typeof (value) === 'object' && value !== null && value.type === 'expirable';
}

/**
 * @private
 */
export function isExpired(value) {
  return typeof (value.expirationTime) === 'number' && (+new Date()) > value.expirationTime;
}

/**
 * @private
 *
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

export default EmberObject.extend(DecoratorMixin, {
  getItem(key) {
    let obj = this._super(key);

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
    if (typeof (this.get('expirations')[key]) === 'function') {
      return expirable(this.get('expirations')[key](), value);
    } else {
      return value;
    }
  }
});
