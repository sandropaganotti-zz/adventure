System.register(['./sprite-sheet.js', './sprite.js', './util.js', './item.js'], function (_export) {
  'use strict';

  var spriteSheetTest, spriteTest, utilTest, itemTest;
  return {
    setters: [function (_spriteSheetJs) {
      spriteSheetTest = _spriteSheetJs['default'];
    }, function (_spriteJs) {
      spriteTest = _spriteJs['default'];
    }, function (_utilJs) {
      utilTest = _utilJs['default'];
    }, function (_itemJs) {
      itemTest = _itemJs['default'];
    }],
    execute: function () {

      spriteSheetTest();
      spriteTest();
      itemTest();
      utilTest();

      mocha.run();
    }
  };
});
//# sourceMappingURL=index.js.map
