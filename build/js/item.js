System.register([], function (_export) {
  "use strict";

  var Item;

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  return {
    setters: [],
    execute: function () {
      Item = (function () {
        function Item(_ref) {
          var _ref$sprites = _ref.sprites;
          var sprites = _ref$sprites === undefined ? {} : _ref$sprites;
          var _ref$context = _ref.context;
          var context = _ref$context === undefined ? null : _ref$context;

          _classCallCheck(this, Item);

          this.sprites = sprites;
          this.context = context;
        }

        _createClass(Item, [{
          key: "build",
          value: function build() {
            var _this = this;

            return Promise.all(Object.keys(this.sprites).map(function (key) {
              _this.sprites[key].build();
            })).then(function () {
              return _this;
            });
          }
        }, {
          key: "still",
          value: function still(_ref2) {
            var key = _ref2.key;
            var _ref2$x = _ref2.x;
            var x = _ref2$x === undefined ? null : _ref2$x;
            var _ref2$y = _ref2.y;
            var y = _ref2$y === undefined ? null : _ref2$y;

            this.animation = this.iterator({ x: x, y: y });
            this.sprite = this.sprites[key];
            this.animation.next();
            return this.sprite.run();
          }
        }, {
          key: "move",
          value: function move(_ref3) {
            var _this2 = this;

            var key = _ref3.key;
            var _ref3$fromX = _ref3.fromX;
            var fromX = _ref3$fromX === undefined ? null : _ref3$fromX;
            var _ref3$fromY = _ref3.fromY;
            var fromY = _ref3$fromY === undefined ? null : _ref3$fromY;
            var toX = _ref3.toX;
            var toY = _ref3.toY;
            var speed = _ref3.speed;

            return new Promise(function (resolve) {
              _this2.animation = _this2.iterator({ resolve: resolve, x: fromX, y: fromY, toX: toX, toY: toY, speed: speed });
              _this2.sprite = _this2.sprites[key];
              _this2.animation.next();
              _this2.sprite.run();
            });
          }
        }, {
          key: "tick",
          value: function tick(_ref4) {
            var delta = _ref4.delta;
            var _ref4$context = _ref4.context;
            var context = _ref4$context === undefined ? null : _ref4$context;

            if (this.sprite && this.animation) {
              var next = this.animation.next(delta);
              if (next.done) {
                this.animation = null;
              }
              this.sprite.tick({ delta: delta, context: this.context, x: this.x, y: this.y });
            }
          }
        }, {
          key: "iterator",
          get: function get() {
            return regeneratorRuntime.mark(function callee$2$0(_ref5) {
              var resolve = _ref5.resolve;
              var _ref5$x = _ref5.x;
              var x = _ref5$x === undefined ? null : _ref5$x;
              var _ref5$y = _ref5.y;
              var y = _ref5$y === undefined ? null : _ref5$y;
              var _ref5$toX = _ref5.toX;
              var toX = _ref5$toX === undefined ? null : _ref5$toX;
              var _ref5$toY = _ref5.toY;
              var toY = _ref5$toY === undefined ? null : _ref5$toY;
              var _ref5$speed = _ref5.speed;
              var speed = _ref5$speed === undefined ? 0 : _ref5$speed;

              var line, _ref6, _ref62, dx, dy, delta;

              return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    this.x = x || this.x;
                    this.y = y || this.y;
                    line = toX && toY ? Math.pow(Math.pow(this.x - toX, 2) + Math.pow(this.y - toY, 2), 0.5) : 0;
                    _ref6 = line ? [(toX - this.x) / line * speed, (toY - this.y) / line * speed] : [0, 0];
                    _ref62 = _slicedToArray(_ref6, 2);
                    dx = _ref62[0];
                    dy = _ref62[1];

                  case 7:
                    if (!(!speed || this.x !== toX && this.y !== toY)) {
                      context$3$0.next = 16;
                      break;
                    }

                    context$3$0.next = 10;
                    return null;

                  case 10:
                    delta = context$3$0.sent;

                    this.x = this.x + dx * delta;
                    this.y = this.y + dy * delta;
                    if (toX && toY) {
                      this.x = (dx > 0 ? this.x > toX : this.x < toX) ? toX : this.x;
                      this.y = (dy > 0 ? this.y > toY : this.y < toY) ? toY : this.y;
                    }
                    context$3$0.next = 7;
                    break;

                  case 16:
                    resolve();

                  case 17:
                  case "end":
                    return context$3$0.stop();
                }
              }, callee$2$0, this);
            });
          }
        }]);

        return Item;
      })();

      _export("default", Item);
    }
  };
});
//# sourceMappingURL=item.js.map
