System.register(['../js/item.js', './sprites/guybrush.js'], function (_export) {
  'use strict';

  var Item, guybrushSprites;
  return {
    setters: [function (_jsItemJs) {
      Item = _jsItemJs['default'];
    }, function (_spritesGuybrushJs) {
      guybrushSprites = _spritesGuybrushJs['default'];
    }],
    execute: function () {
      _export('default', function () {

        describe('Item', function () {

          it('exists', function () {
            expect(Item).to.not.be.undefined;
          });

          it('create an item', function () {
            var guybrush = new Item({
              sprites: guybrushSprites()
            });

            expect(Object.keys(guybrush.sprites).length).to.be.equal(2);
          });

          it('position a sprite', function (done) {
            var guybrush = new Item({
              sprites: guybrushSprites()
            });
            guybrush.build().then(function (item) {
              item.still({ key: 'waiting', x: 50, y: 50 });
              item.tick({ delta: 10 });
              expect(item.sprite.sheet.sequence.key).to.be.equal(249);
              item.tick({ delta: 1000 });
              expect(item.sprite.sheet.sequence.key).to.be.equal(249);
              expect(item.sprite.frame.id).to.be.equal(0);
              done();
            });
          });

          it('moves a sprite', function (done) {
            var guybrush = new Item({
              sprites: guybrushSprites()
            });
            guybrush.build().then(function (item) {
              item.move({ key: 'walkingRight', speed: 2, fromX: 50, fromY: 50, toX: 100, toY: 100 }).then(function () {
                expect(item.x).to.be.equal(100);
                expect(item.y).to.be.equal(100);
              }).then(done);
              item.tick({ delta: 10 });
              expect(Math.round(item.x)).to.be.equal(64);
              expect(Math.round(item.y)).to.be.equal(64);
              item.tick({ delta: 1000 });
            });
          });
        });
      });
    }
  };
});
//# sourceMappingURL=item.js.map
