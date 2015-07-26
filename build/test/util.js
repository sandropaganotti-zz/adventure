System.register(['../js/util.js'], function (_export) {
  'use strict';

  var isEqual;
  return {
    setters: [function (_jsUtilJs) {
      isEqual = _jsUtilJs.isEqual;
    }],
    execute: function () {
      _export('default', function () {

        describe('isEqual', function () {

          it('detect arrays equaliy', function () {
            expect(isEqual([1, 2, 3], [1, 2, 3])).to.be['true'];
          });
        });
      });
    }
  };
});
//# sourceMappingURL=util.js.map
