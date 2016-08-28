/*jshint node:true*/
'use strict';

module.exports = function(environment, appConfig) {
  appConfig['compression-activate'] = appConfig['compression-activate'] || { compression: true };

  return { };
};
