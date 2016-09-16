import { register } from 'ember-preferences/setup';
import defaultPreferences from '../-ember-preferences-internal';
import preferences from '../preferences';

var merge = Ember.assign || Ember.merge;

function initialize(application) {
  // FIXME: We test the application to know if we're using ember 1.12, 1.13 or +2.0
  var container = application.register ? application : application.container,
      defaults = defaultPreferences(),
      userPreferences = preferences();

  register(container, merge(defaults, userPreferences));
  cleanLocalStorage(application.name);
}

function cleanLocalStorage(ep_namespace) {
  let keys = Object.keys(localStorage);
  let regex = new RegExp(ep_namespace + ':.+', 'i');
  for(let k in localStorage) {
    if (k.match(regex) && (typeof (localStorage[k]) === 'undefined' || (localStorage[k] === null))){
      localStorage.removeItem(k);
    }
  }
}

export default {
  name: 'ember-preferences',
  initialize
};
