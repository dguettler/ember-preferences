import Ember from 'ember';
import preference from 'ember-preferences/computed';

export default Ember.Controller.extend({
  title: preference('title', { defaultValue: 'Hello World!' }),
  empty: preference('empty'),
  serviceValue: preference(),

  actions: {
    simpleValue() {
      this.set('title', 'Hey Hey! Bye bye');
    },
    complexValue() {
      this.set('title', { complex: 'Complex value!' });
    },
    serviceValue() {
      this.set('preferences.serviceValue', 'service value updated');
    }
  }
});
