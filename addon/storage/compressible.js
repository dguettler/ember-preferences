import EmberObject from '@ember/object';
import DecoratorMixin from 'ember-preferences/storage/decorator';
/* global LZString */

/**
 * @private
 */
export default EmberObject.extend(DecoratorMixin, {
  configuration: null,

  getItem(key) {
    let obj = this._super(key);

    if (this.isWhiteListed(key)) {
      return LZString.decompressFromUTF16(obj);
    }

    return obj;
  },

  setItem(key, value) {
    let compressed;

    if (this.isWhiteListed(key)) {
      compressed = LZString.compressToUTF16(value);
    } else {
      compressed = value;
    }

    this._super(key, compressed);

    return value;
  },

  isWhiteListed(key) {
    let config = this.get('configuration');

    return config[key] && config[key].compression;
  }
});
