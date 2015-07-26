System.register(['./sprite-sheet.js'], function (_export) {
  'use strict';

  var spriteSheet, Sprite;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_spriteSheetJs) {
      spriteSheet = _spriteSheetJs['default'];
    }],
    execute: function () {
      Sprite = (function () {
        function Sprite(_ref) {
          var _ref$sheet = _ref.sheet;
          var sheet = _ref$sheet === undefined ? {} : _ref$sheet;

          _classCallCheck(this, Sprite);

          this.sheet = sheet;
          this.frames = sheet.frames;
        }

        _createClass(Sprite, [{
          key: 'build',
          value: function build() {
            var _this = this;

            var _sheet$sequence = this.sheet.sequence;
            var key = _sheet$sequence.key;
            var duration = _sheet$sequence.duration;

            return spriteSheet.get({ path: this.sheet.name }).then(function (sheet) {
              _this.image = sheet.image;
              _this.frames = _this.frames || sheet.sequences[key].map(function (seq) {
                seq.duration = duration;
                return seq;
              });
            }).then(function () {
              return _this;
            });
          }
        }, {
          key: 'loop',
          value: function loop() {
            var _this2 = this;

            return new Promise(function (resolve) {
              _this2.animation = _this2.iterator({ resolve: resolve });
            });
          }
        }, {
          key: 'run',
          value: function run() {
            this.animation = this.iterator({ times: -1 });
            return Promise.resolve();
          }
        }, {
          key: 'stop',
          value: function stop() {
            this.animation = null;
            this.frame = null;
            return Promise.resolve();
          }
        }, {
          key: 'tick',
          value: function tick(_ref2) {
            var delta = _ref2.delta;
            var _ref2$x = _ref2.x;
            var x = _ref2$x === undefined ? 0 : _ref2$x;
            var _ref2$y = _ref2.y;
            var y = _ref2$y === undefined ? 0 : _ref2$y;
            var _ref2$context = _ref2.context;
            var context = _ref2$context === undefined ? null : _ref2$context;

            if (this.animation && this.frames) {
              this.frame = this.frame || this.animation.next().value;
              this.animation.progress = (this.animation.progress || 0) + delta;

              while (this.animation && this.animation.progress > this.frame.duration) {
                this.animation.progress -= this.frame.duration;
                var next = this.animation.next();
                if (!next.done) {
                  this.frame = next.value;
                } else {
                  this.animation = null;
                  this.frame = null;
                }
              }
            }
            this.draw(x, y, context);
          }
        }, {
          key: 'draw',
          value: function draw(x, y, context) {
            if (this.frame && context) {
              context.putImageData(this.image, x - this.frame.width / 2 - this.frame.left, y - this.frame.height / 2 - this.frame.top, this.frame.left, this.frame.top, this.frame.width, this.frame.height);
            }
          }
        }, {
          key: 'iterator',
          get: function get() {
            return regeneratorRuntime.mark(function callee$2$0(_ref3) {
              var resolve = _ref3.resolve;
              var _ref3$times = _ref3.times;
              var times = _ref3$times === undefined ? 1 : _ref3$times;
              var _ref3$start = _ref3.start;
              var start = _ref3$start === undefined ? 0 : _ref3$start;
              var i;
              return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    i = start;

                  case 1:
                    if (!(times === -1 || i < this.frames.length * times)) {
                      context$3$0.next = 7;
                      break;
                    }

                    context$3$0.next = 4;
                    return this.frames[i % this.frames.length];

                  case 4:
                    i++;
                    context$3$0.next = 1;
                    break;

                  case 7:
                    resolve();

                  case 8:
                  case 'end':
                    return context$3$0.stop();
                }
              }, callee$2$0, this);
            });
          }
        }]);

        return Sprite;
      })();

      _export('default', Sprite);
    }
  };
});
//# sourceMappingURL=sprite.js.map
