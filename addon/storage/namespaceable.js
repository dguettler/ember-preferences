import EmberObject from '@ember/object';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default EmberObject.extend(DecoratorMixin, {
  namespace: null,

  setItem(key, value) {
    return this._super(this.fullQualifiedKey(key), value);
  },

  getItem(key) {
    return this._super(this.fullQualifiedKey(key));
  },

  removeItem(key) {
    return this._super(this.fullQualifiedKey(key));
  },

  /**
   * @private
   */
  fullQualifiedKey(key) {
    let namespace = this.get('namespace');
    let fqk;

    if (typeof (namespace) !== 'undefined' && namespace !== null) {
      fqk = `${this.get('namespace')}:${key}`;
    } else {
      fqk = key;
    }

    return fqk;
  }
});
