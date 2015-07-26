export default class Item{
  constructor({sprites = {}, context = null}){
    this.sprites = sprites;
    this.context = context;
  }
  
  build(){
    return Promise.all(Object.keys(this.sprites).map(key => {
      this.sprites[key].build();
    })).then(() => this);
  }
  
  get iterator(){ return function *({resolve,x=null, y=null, toX=null, toY=null, speed=0}){
    this.x = x || this.x;
    this.y = y || this.y;
    let line = toX && toY ? Math.pow(Math.pow(this.x - toX,2) + Math.pow(this.y - toY,2), 0.5) : 0;
    let [dx, dy] = line ? [(toX - this.x) / line * speed, (toY - this.y) / line * speed] : [0,0]; 
    while(!speed || (this.x !== toX && this.y !== toY)){
      let delta = yield(null);
      this.x = this.x + dx * delta;
      this.y = this.y + dy * delta;
      if(toX && toY){
        this.x = (dx > 0 ? this.x > toX : this.x < toX ) ? toX : this.x;
        this.y = (dy > 0 ? this.y > toY : this.y < toY ) ? toY : this.y;
      }
    }
    resolve();
  }}
  
  still({key, x = null, y = null}){
    this.animation = this.iterator({x:x, y:y});
    this.sprite = this.sprites[key];
    this.animation.next();
    return this.sprite.run();
  }
  
  move({key, fromX = null, fromY = null, toX, toY, speed}){
    return new Promise( resolve => {
      this.animation = this.iterator({resolve: resolve, x:fromX, y:fromY, toX: toX, toY: toY, speed: speed});
      this.sprite = this.sprites[key];
      this.animation.next();
      this.sprite.run();
    });
  }
  
  tick({delta, context = null}){
    if(this.sprite && this.animation){
      let next = this.animation.next(delta);
      if(next.done){
        this.animation = null;
      }
      this.sprite.tick({delta: delta, context: this.context, x: this.x, y: this.y}); 
    }
  }
  
}