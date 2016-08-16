import Ember from 'ember';

// Documentation
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
// https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework

// Maximum number of seconds elapsed since 1 January 1970 00:00:00 UTC
// const END_OF_TIME = new Date(0x7fffffff * 1e3);

function getValue(key) {
  // jscs:disable
  return decodeURIComponent(
    document.cookie.replace(
      new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  // jscs:enable
}

export default Ember.Object.extend({
  setItem(key, value) {
    document.cookie = `${key}=${encodeURIComponent(value)}`;
  },

  getItem(key) {
    return getValue(key);
  }
});
