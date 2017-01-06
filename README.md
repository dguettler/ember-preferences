# Ember Preferences
[![Build Status](https://travis-ci.org/san650/ember-preferences.svg?branch=master)](https://travis-ci.org/san650/ember-preferences)
![Latest version](https://img.shields.io/npm/v/ember-preferences.svg)
![Ember versions](https://embadge.io/v1/badge.svg?start=1.12.0)

Easy way of managing user preferences on the client side with local storage (and other providers in the future)

## Installation

```
$ ember install ember-preferences
```

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md).

## Synopsis

```js
import Ember from 'ember';
import preference from 'ember-preferences/computed';

export default Ember.Component.extend({
  isVisible: preference('isVisible', { defaultValue: true }),

  actions: {
    onHide() {
      this.set('isVisible', false);
    }
  }
});
```

Every time `isVisible` is changed, the changes are stored in local storage. If you reload the page, the value is retrieved from local storage on `get`.

## Development

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

### Project's health

[![Build Status](https://travis-ci.org/san650/ember-preferences.svg?branch=master)](https://travis-ci.org/san650/ember-preferences)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/6162adb06a07473cad60cffe3797270c)](https://www.codacy.com/app/san650/ember-preferences)
[![Ember Observer Score](https://emberobserver.com/badges/ember-preferences.svg)](https://emberobserver.com/addons/ember-preferences)

## License

ember-preferences is licensed under the MIT license.

See [LICENSE](./LICENSE.md) for the full license text.
