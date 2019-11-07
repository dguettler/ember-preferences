import { register } from 'ember-preferences/setup';
import defaultPreferences from '../-ember-preferences-internal';
import preferences from '../preferences';
import { assign } from '@ember/polyfills';

export function initialize(application) {
  const defaults = defaultPreferences();
  const userPreferences = preferences();

  // application.inject('route', 'foo', 'service:foo');
  register(application, assign(defaults, userPreferences));
}

export default {
  name: 'ember-preferences',
  initialize
};
