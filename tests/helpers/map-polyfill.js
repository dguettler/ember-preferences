function MapPolyfill() {
  this.values = [];
}

MapPolyfill.prototype = {
  set(key, value) {
    let tuple = this.find(key);

    if (tuple) {
      tuple[1] = value;
    } else {
      this.values.push([key, value]);
    }
  },

  get(key) {
    let tuple = this.find(key);

    if (tuple) {
      return tuple[1];
    }
  },

  find(key) {
    let tuple;

    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i][0] === key) {
        tuple = this.values[i];
        break;
      }
    }

    return tuple;
  }
};

if (!window.Map) {
  window.Map = MapPolyfill;
}
