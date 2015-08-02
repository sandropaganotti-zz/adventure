System.register(['./util.js'], function (_export) {
  'use strict';

  var isEqual, SpriteSheet;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_utilJs) {
      isEqual = _utilJs.isEqual;
    }],
    execute: function () {
      SpriteSheet = (function () {
        function SpriteSheet() {
          _classCallCheck(this, SpriteSheet);

          this.sheets = {};
        }

        _createClass(SpriteSheet, [{
          key: 'get',
          value: function get(_ref) {
            var _this = this;

            var path = _ref.path;

            return new Promise(function (resolve) {
              Object.keys(_this.sheets).indexOf(path) !== -1 ? resolve(_this.sheets[path]) : _this.load({ path: path }).then(function (sheet) {
                _this.sheets[path] = sheet;
                resolve(sheet);
              });
            });
          }
        }, {
          key: 'load',
          value: function load(_ref2) {
            var _this2 = this;

            var path = _ref2.path;
            var alpha = _ref2.alpha;

            return new Promise(function (resolve) {
              var sheet = new Image();
              sheet.onload = function () {
                var context = document.createElement('canvas').getContext('2d');
                context.canvas.width = sheet.width;
                context.canvas.height = sheet.height;
                context.drawImage(sheet, 0, 0);
                var imageData = context.getImageData(0, 0, sheet.width, sheet.height);

                var _process = _this2.process(imageData);

                var image = _process.image;
                var sequences = _process.sequences;

                context.putImageData(image, 0, 0);
                resolve({ image: context.canvas, sequences: _this2.sequences(sequences) });
              };
              sheet.src = path;
            });
          }
        }, {
          key: 'process',
          value: function process(image) {
            var data = image.data,
                length = image.data.length;
            var alpha = [data[0], data[1], data[2]];
            var marker = [data[length - 4], data[length - 3], data[length - 2]];
            var hasMarker = !isEqual(marker, alpha);
            var sequences = {};
            for (var i = 0; i < data.length; i += 4) {
              var pixel = [data[i], data[i + 1], data[i + 2]];
              if (hasMarker && isEqual(marker, pixel) && data[i + 3] !== 255) {
                sequences[data[i + 3]] = sequences[data[i + 3]] || [];
                sequences[data[i + 3]].push([i / 4 % image.width, Math.floor(i / 4 / image.width)]);
              }
              if (isEqual(alpha, pixel)) {
                data[i + 3] = 0;
              }
            }
            return { image: image, sequences: Object.keys(sequences).length === 0 ? null : sequences };
          }
        }, {
          key: 'sequences',
          value: function sequences(_sequences) {
            return !_sequences ? null : Object.keys(_sequences).reduce(function (frames, key) {
              var seq = _sequences[key].sort(function (pixel1, pixel2) {
                return pixel1[0] + pixel1[1] / 1000 - (pixel2[0] + pixel2[1] / 1000);
              });
              frames[key] = [];
              for (var i = 0; i < seq.length; i += 4) {
                frames[key].push({
                  id: i / 4,
                  top: seq[i][1] + 1,
                  left: seq[i][0] + 1,
                  width: seq[i + 2][0] - seq[i][0] - 1,
                  height: seq[i + 1][1] - seq[i][1] - 1
                });
              }
              return frames;
            }, {});
          }
        }]);

        return SpriteSheet;
      })();

      _export('default', new SpriteSheet());
    }
  };
});
//# sourceMappingURL=sprite-sheet.js.map
