/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-preferences',
  isDevelopingAddon() {
    return true;
  },
  options: {
    nodeAssets: {
      'lz-string': function() {
        return {
          enabled: this._shouldIncludeFiles(),
          import: ['libs/lz-string.js']
        };
      }
    }
  },

  included: function(app) {
    this.app = app
    this.addonConfig = this.app.project.config(app.env)['compression-activate'] || { compression: true };

    this._super.included.apply(this, arguments);
  },

  _shouldIncludeFiles: function() {
    return this.addonConfig.compression;
  }
};
