'use strict';

module.exports = function(_, appConfig) {
  appConfig['compression-activate'] = appConfig['compression-activate'] || { compression: true };

  return { };
};
