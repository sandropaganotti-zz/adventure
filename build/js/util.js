System.register([], function (_export) {
  "use strict";

  _export("isEqual", isEqual);

  function isEqual(arr1, arr2) {
    var i = arr1.length;
    if (i != arr2.length) return false;
    while (i--) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=util.js.map
