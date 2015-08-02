import spriteSheet from '../js/sprite-sheet.js';

export default function(){

  describe('SpriteSheet', () => {
        
    it('exist', () => {
      expect(spriteSheet).to.exist;     
    });
        
    it('store and caches an asset', done => {
      spriteSheet.get({path: './assets/sprite-sheets/guybrush.png'})
        .then(guybrush => {
          expect(guybrush).to.exist;
          let guybrushSheet = spriteSheet.sheets['./assets/sprite-sheets/guybrush.png'];
          expect(guybrushSheet).to.exist;
          expect(guybrushSheet.image.width).to.be.equal(guybrush.image.width);
          expect(guybrushSheet.image.height).to.be.equal(guybrush.image.height);
          expect(Object.keys(guybrushSheet.sequences).length).to.be.equal(2);
          expect(guybrushSheet.sequences[252].length).to.be.equal(6);
        })
        .then(done);
    });
    
    it('set opacity 0 to pixel with color alpha', done => {
      spriteSheet.get({path: './assets/sprite-sheets/guybrush.png'})
        .then(guybrush => {
          let imageData = guybrush.image.getContext('2d').getImageData(0,0,guybrush.image.width,guybrush.image.height);
          expect(imageData.data[3]).to.be.equal(0);
        })
        .then(done);
    });
    
    it('extract the sprite boundary markers', () => {
      let black = [0,0,0,255];
      let marker = [255,0,0,255];
      let sequence = [255,0,0,252];
      let fakeImage = 
        [ black, black,     black,  
          black, sequence,  sequence,
          black, black,     marker ].reduce((prev,cur) => prev.concat(cur), []);
    
      let {image, sequences} = spriteSheet.process({data: fakeImage, width: 3, height: 3});
      
      expect(sequences).to.not.be.null;
      expect(sequences[252]).to.not.be.null;
      expect(sequences[252][0]).to.be.deep.equal([1,1]);
      expect(sequences[252][1]).to.be.deep.equal([2,1]);
    });
    
    it('generates the frames out of a sequence', () => {
      let sequences = {1: [[10,50],[40,50],[10,100],[40,100]]};
      let frames = spriteSheet.sequences(sequences);
      
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

}