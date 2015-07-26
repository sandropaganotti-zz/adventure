System.register(['../../js/sprite.js'], function (_export) {
  'use strict';

  var Sprite, sheetPath;

  _export('default', guybrush);

  function guybrush() {
    return {
      walkingRight: new Sprite({
        sheet: {
          name: sheetPath,
          sequence: {
            key: 252,
            duration: 100
          }
        }
      }),
      waiting: new Sprite({
        sheet: {
          name: sheetPath,
          sequence: {
            key: 249,
            duration: 100
          }
        }
      })
    };
  }

  return {
    setters: [function (_jsSpriteJs) {
      Sprite = _jsSpriteJs['default'];
    }],
    execute: function () {
      sheetPath = './assets/sprite-sheets/guybrush.png';
    }
  };
});
//# sourceMappingURL=guybrush.js.map
