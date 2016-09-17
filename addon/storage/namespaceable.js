import Ember from 'ember';
import DecoratorMixin from 'ember-preferences/storage/decorator';

export default Ember.Object.extend(DecoratorMixin, {
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
    let config = this.get('configuration');
    let namespace;

    if (config[key] && config[key].namespace) {
      namespace = config[key].namespace;
    }
    namespace =  namespace || this.get('namespace');

    let fqk;

    if (typeof (namespace) !== 'undefined' && namespace !== null) {
      fqk = `${this.get('namespace')}:${key}`;
    } else {
      fqk = key;
    }

    return fqk;
  }
});
