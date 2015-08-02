export default class Item{
  constructor({sprites = {}, context = null, direction = 'right'}){
    this.sprites = sprites;
    this.context = context;
    this.direction = direction;
  }
  
  build(){
    return Promise.all(Object.keys(this.sprites).map(key => {
      let sprite = this.sprites[key];
      sprite.build ? sprite.build() : Promise.all(Object.keys(sprite).map(direction => {
        sprite[direction].build();
      }));
    })).then(() => this);
  }
  
  get iterator(){ return function *({resolve,x=null, y=null, toX=null, toY=null, speed=0, dx=0, dy=0}){
    this.x = x;
    this.y = y;
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
  
  still({key = this.key, x = this.x, y = this.y}){
    this.key = key;
    this.animation = this.iterator({x:x, y:y});
    this.sprite = this.sprites[key];
    this.animation.next();
    return this.sprite.run();
  }
  
  move({key = this.key, fromX = this.x, fromY = this.y, toX, toY, speed = this.speed}){
    return new Promise( resolve => {
      let line = Math.pow(Math.pow(fromX - toX,2) + Math.pow(fromY - toY,2), 0.5);
      let [dx, dy] = [(toX - fromX) / line * speed, (toY - fromY) / line * speed];
      this.key = key;
      this.speed = speed;
      this.direction = Math.abs(dx) >= Math.abs(dy) ? dx > 0 ? 'right' : 'left' : dy > 0 ? 'bottom' : 'top';
      this.animation = this.iterator({resolve: resolve, x:fromX, y:fromY, toX: toX, toY: toY, speed: speed, dx: dx, dy: dy});
      this.sprite = this.sprites[key][this.direction] || this.sprites[key]['other'] || this.sprites[key];
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