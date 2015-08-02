import Sprite from '../js/sprite.js';
import guybrush from './sprites/guybrush.js'; 

export default function(){
    
  describe('Sprite', () => {
       
    it('exist', () => {
      expect(Sprite).to.exist;       
    });
    
    describe('configuration options', () => {
      
      it('works specifing frame boundaries', () => {
        let guybrushWalkingRight = new Sprite({
          sheet: {
            name: './assets/sprite-sheets/guybrush.png',
            frames: [{
              top: 100,
              left: 50,
              height: 50,
              width: 50,
              duration: 100
            }]
          }
        });
        
        expect(guybrushWalkingRight.frames.length).to.be.equal(1);
        expect(guybrushWalkingRight.frames[0].left).to.be.equal(50);
      });
      
    });
    
    describe('Initialization and workflow', () => {
      let guybrushWalkingRight, context;
      
      beforeEach(() => {
        context = document.createElement('canvas').getContext('2d');
        context.canvas.width = 100;
        context.canvas.height = 100;
        
        guybrushWalkingRight = guybrush().walkingRight;
      });
      
      it('loads a sprite', done => {
        guybrushWalkingRight.build().then(() => {
          expect(guybrushWalkingRight.frames.length).to.be.equal(6);
        }).then(done);        
      });
      
      it('builds a sprite', done => {
        guybrushWalkingRight.build().then(() => {
          expect(guybrushWalkingRight.sheet).to.exist;
        }).then(done);
      });
      
      it('runs a sprite', done => {
        let sprite = guybrushWalkingRight;
        sprite
          .build()
          .then(() => {
            sprite.loop().then(done);
            
            sprite.tick({delta: 10});
            expect(sprite.frame.left).to.be.equal(sprite.frames[0].left);
            sprite.tick({delta: 95});
            expect(sprite.frame.left).to.be.equal(sprite.frames[1].left);
            sprite.tick({delta: 600});
            expect(sprite.animation).to.be.null;
          });
      });
      
      it('skips frames when necessary', done => {
        let sprite = guybrushWalkingRight;
        sprite
          .build()
          .then(() => {
            sprite.loop().then(done);
            
            sprite.tick({delta: 101});
            expect(sprite.frame.left).to.be.equal(sprite.frames[1].left);
            sprite.tick({delta: 1000});
            expect(sprite.animation).to.be.null;
          });
      });      
      
      it('draw a sprite', done => {
        let sprite = guybrushWalkingRight;
        sprite
          .build()
          .then(sprite => {
            sprite.loop().then(done);
            
            sprite.tick({delta: 1, x:0, y:0, context:context});
            sprite.tick({delta: 10, x:sprite.frame.width/2 , y:sprite.frame.height/2, context: context});
            let imageData = context.getImageData(12,6,1,1);
            expect(imageData.data[0]).to.be.equal(0);
            expect(imageData.data[1]).to.be.equal(0);
            expect(imageData.data[2]).to.be.equal(0);
            expect(imageData.data[3]).to.be.equal(255);
            sprite.tick({delta: 95, x:sprite.frame.width/2 , y:sprite.frame.height/2, context: context});
            imageData = context.getImageData(12,6,1,1);
            expect(imageData.data[0]).to.be.equal(0);
            expect(imageData.data[1]).to.be.equal(0);
            expect(imageData.data[2]).to.be.equal(0);
            expect(imageData.data[3]).to.be.equal(255);
            sprite.tick({delta: 1000});
          });
      });
      
      it('plays a sprite until stopped', done => {
        let sprite = guybrushWalkingRight;
        sprite
          .build()
          .then(() => sprite.run())
          .then(() => {
            sprite.tick({delta: 10});
            expect(sprite.frame.left).to.be.equal(sprite.frames[0].left);
            sprite.tick({delta: 600});
            expect(sprite.frame.left).to.be.equal(sprite.frames[0].left);
          
            return sprite.stop();
          })
          .then(() => {
            sprite.tick({delta: 1});
            expect(sprite.frame).to.be.null;
          })
          .then(done);
      });
      
      it('can play a sprite flipped', done => {
        let sprite = new Sprite({ // guybrushWalkingRight
          sheet: {
            name: './assets/sprite-sheets/guybrush.png',
            flipHorizontally: true,
            sequence: {
              key: 252,
              duration: 100
            }
          }
        });
        sprite
          .build()
          .then(() => {
            sprite.loop().then(done);
            
            sprite.tick({delta: 10, x:0 , y:0, context: context});
            sprite.tick({delta: 10, x:sprite.frame.width/2 , y:sprite.frame.height/2, context: context});
            let imageData = context.getImageData(4,6,1,1);
            if(navigator.userAgent.indexOf('PhantomJS') === -1){
              expect(imageData.data[0]).to.be.equal(0);
              expect(imageData.data[1]).to.be.equal(0);
              expect(imageData.data[2]).to.be.equal(0);
              expect(imageData.data[3]).to.be.equal(255);
            } else { // PhantomJS seems to perform some image smoothing
              expect(imageData.data[0]).to.be.equal(22);
              expect(imageData.data[1]).to.be.equal(12);
              expect(imageData.data[2]).to.be.equal(11);
              expect(imageData.data[3]).to.be.equal(255);            
            }
            sprite.tick({delta: 1000});
          });
      });
      
    });
  });
}