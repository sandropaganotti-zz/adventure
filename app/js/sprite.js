import spriteSheet from './sprite-sheet.js';

export default class Sprite{
  
  constructor({sheet = {}}){
    this.sheet = sheet;
    this.frames = sheet.frames;
  }
  
  build(){
    let {key, duration} = this.sheet.sequence;
    return spriteSheet.get({path: this.sheet.name})
      .then(sheet => {
        this.image = sheet.image;
        this.frames = this.frames || sheet.sequences[key].map(seq => {
          seq.duration = duration;
          return seq;
        });
      }).then(() => this);
  }
  
  get iterator(){ return function*({resolve, times = 1, start = 0}){
    for(let i=start; times === -1 || i < this.frames.length * times; i++){
      yield(this.frames[i % this.frames.length]);
    }
    resolve();
  }}
  
  loop(){
    return new Promise(resolve => {
      this.animation = this.iterator({resolve: resolve});
    });
  }
  
  run(){
    this.animation = this.iterator({times: -1});
    return Promise.resolve();
  }
  
  stop(){
    this.animation = null;
    this.frame = null;
    return Promise.resolve();
  }
   
  tick({delta, x = 0, y = 0, context = null}){
    if(this.animation && this.frames){
      this.frame = this.frame || this.animation.next().value;
      this.animation.progress = (this.animation.progress || 0) + delta;

      while(this.animation && this.animation.progress > this.frame.duration){
        this.animation.progress -= this.frame.duration;
        let next = this.animation.next();
        if(!next.done){
          this.frame = next.value;
        }else{
          this.animation = null;
          this.frame = null;
        }
      }
    }
    this.draw(x,y,context);
  }
  
  draw(x,y,context){
    if(this.frame && context){
      context.putImageData(
        this.image, (x - this.frame.width/2) - this.frame.left, (y - this.frame.height/2) - this.frame.top, 
        this.frame.left, this.frame.top, this.frame.width, this.frame.height
      );
    }
  }
}