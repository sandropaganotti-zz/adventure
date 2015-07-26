System.register(['../js/sprite-sheet.js'], function (_export) {
  'use strict';

  var spriteSheet;
  return {
    setters: [function (_jsSpriteSheetJs) {
      spriteSheet = _jsSpriteSheetJs['default'];
    }],
    execute: function () {
      _export('default', function () {

        describe('SpriteSheet', function () {

          it('exist', function () {
            expect(spriteSheet).to.exist;
          });

          it('store and caches an asset', function (done) {
            spriteSheet.get({ path: './assets/sprite-sheets/guybrush.png' }).then(function (guybrush) {
              expect(guybrush).to.exist;
              var guybrushSheet = spriteSheet.sheets['./assets/sprite-sheets/guybrush.png'];
              expect(guybrushSheet).to.exist;
              expect(guybrushSheet.image.width).to.be.equal(guybrush.image.width);
              expect(guybrushSheet.image.height).to.be.equal(guybrush.image.height);
              expect(Object.keys(guybrushSheet.sequences).length).to.be.equal(2);
              expect(guybrushSheet.sequences[252].length).to.be.equal(6);
            }).then(done);
          });

          it('set opacity 0 to pixel with color alpha', function (done) {
            spriteSheet.get({ path: './assets/sprite-sheets/guybrush.png' }).then(function (guybrush) {
              expect(guybrush.image.data[3]).to.be.equal(0);
            }).then(done);
          });

          it('extract the sprite boundary markers', function () {
            var black = [0, 0, 0, 255];
            var marker = [255, 0, 0, 255];
            var sequence = [255, 0, 0, 252];
            var fakeImage = [black, black, black, black, sequence, sequence, black, black, marker].reduce(function (prev, cur) {
              return prev.concat(cur);
            }, []);

            var _spriteSheet$process = spriteSheet.process({ data: fakeImage, width: 3, height: 3 });

            var image = _spriteSheet$process.image;
            var sequences = _spriteSheet$process.sequences;

            expect(sequences).to.not.be['null'];
            expect(sequences[252]).to.not.be['null'];
            expect(sequences[252][0]).to.be.deep.equal([1, 1]);
            expect(sequences[252][1]).to.be.deep.equal([2, 1]);
          });

          it('generates the frames out of a sequence', function () {
            var sequences = { 1: [[10, 50], [40, 50], [10, 100], [40, 100]] };
            var frames = spriteSheet.sequences(sequences);

            expect(frames[1]).to.not.be.undefined;
            expect(frames[1][0]).to.be.deep.equal({
              id: 0,
              left: 11,
              top: 51,
              width: 29,
              height: 49
            });
          });
        });
      });
    }
  };
});
//# sourceMappingURL=sprite-sheet.js.map
