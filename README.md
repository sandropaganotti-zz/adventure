# Adventure is a 2D game engine written in JavaScript.
But it is also a side project, something not to be taken very seriously and still in a very early stage of development.
## Enough! Give me a demo!
Sure! Just point your browser here - http://sandropaganotti.github.io/adventure/adventure.html - wait for the sprite to appear (sorry, no loading screen yet) and then click around the screen to see it walk.

_Obligatory GIF:_<br>
<img src="http://sandropaganotti.github.io/adventure/assets/doc/guybrushWalking.gif" width="400">
## 5 min getting started

1. install nodejs, npm and grunt.
2. clone the repository `git clone git@github.com:sandropaganotti/adventure.git`
3. move to the root of the repository and launch `npm install`
4. invoke the transpiler from a terminal `grunt babel`
5. fire a local webserver and navigate to `adventure.html` - no webserver? [Use python](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python) `python -m SimpleHTTPServer`!

## Hey! I want to use this!
Do your really _really_ want to use this? The engine is still very young, although, IMO, pretty solid and with great aspirations.

###first you need a sprite sheet
A sprite sheet is simple an image containing some sprites, [here some examples](https://www.google.com/search?q=spritesheet&tbm=isch). Adventure works better if the single frames are marked in sequences, as shown below:<br>
<img src="http://sandropaganotti.github.io/adventure/assets/doc/guybrushWalking.png" width="400">

**how can I mark a sprite sheet?**<br>
Easy, just follow the steps below:

1. pick a color you don't use in the whole spritesheet (in the example above the color is red, `#FF0000FF` - rgba)
2. put that color in the lower-right corner of the spritesheet.
3. use that color to mark the four vertices of each frame, use a different alpha values to group sequences of frames into sprites. In the example above all the six frames belongs to the same sprite so I used the same alpha value: `252` or `FC` in hex. 
4. Done! Later you will be able to retrieve a desired sprite by using its alpha value as a key index - shown below.

###from sprite sheet to sprite
Sure! Create a new, empty `demo.html`. We use SystemJS to load the required modules. First we need to use the `SpriteSheet` service to get the required sprite and create a new `Sprite` instance. For this demo we can use the sprite sheet of [Guybrush Threepwood](https://en.wikipedia.org/wiki/Guybrush_Threepwood) - Kudos to Ultimecia - within the `assets/sprite-sheets` folder.

Now, let's see this first version of `demo.html`:
```html
<html>
  <head>
    <title>Adventure!</title>
  </head>
  <body>
    <script src="node_modules/systemjs/dist/system.js"></script>
    <script src="node_modules/grunt-babel/node_modules/babel-core/browser-polyfill.js"></script>
    <script>
      System.config({ 
        transpiler: 'babel'
      });
      Promise.all([
        System.import('./build/js/sprite.js'),    
        System.import('./build/js/item.js')
      ]).then(function(modules){
        
        var Sprite = modules[0].default;
        var Item = modules[1].default;
        
        // the canvas
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 640;
        canvas.height = 480;        
        
        // a sprite
        var guybrushWalkingRight = new Sprite({
          sheet: {
            name: './assets/sprite-sheets/guybrush.png',
            sequence: {
              key: 252,  // the alpha value associated with the sprite
              duration: 100 // duration of each frame
            }
          }
        });
        
        // this is the same as the previous, but flipped
        var guybrushWalkingLeft = new Sprite({
          sheet: {
            name: sheetPath,
            flipHorizontally: true,
            sequence: {
              key: 252,
              duration: 100
            }
          }
        });
        
        // another sprite
        var guybrushWaiting = new Sprite({
          sheet: {
            name: './assets/sprite-sheets/guybrush.png',
            sequence: {
              key: 249,
              duration: 100
            }
          }
        });
        
      });
    </script>
    <canvas></canvas>
  </body>
</html>
```

### items!
Sprites are collected into `Item` instances, an item can be, for example, Guybrush Threepwood with all its sprites - walking, standing, etc... Here's how we can create an `Item` out of the two previous sprites:

```javascript
var guybrush = new Item({
  sprites: {
    walking: {
        other: guybrushWalkingRight,
        left: guybrushWalkingLeft
    },
    waiting: guybrushWaiting
  },
  context: context
});
```

### rules!
Once you got items you need to build rules, like: _'when I click on the page I want that item to move there using the walking animation'_ Items works using Promises, so we can do something like this:

```javascript
guybrush.build().then(function(){
  guybrush.still({key:'waiting', x: 30, y: 30});
  canvas.addEventListener('click', function(evt){
    guybrush.move({key:'walking', speed: 0.07, toX: evt.offsetX, toY: evt.offsetY})
      .then(function(){
        return guybrush.still({key:'waiting'});
      });
  }, false);
});
```
### the tick concept
Adventure does not embed any internal clock, it doesn't have any `setTimeout`, or `setInterval`, or `requestAnimationFrame` buried into it. Objects simply expose a `tick` method that accepts a `delta` parameter that contains the number of milliseconds between the previous `tick` call and the current. This makes testing the whole thing super easy. Here's a simple way to invoke the `tick`:

```javascript
var prev;
function tick(){
  var timestamp = Date.now();
  context.clearRect(0,0,canvas.width,canvas.height);
  guybrush.tick({delta: timestamp - prev});
  prev = timestamp;
  window.requestAnimationFrame(tick);
}

prev = Date.now();
window.requestAnimationFrame(tick);
```

### done.
Fire `demo.html` in your browser and enjoy the result, which should be identical to `adventure.html`.

## Hey, wait! What about detailed API doc?
Yeah, well.. this project is still in a too early stage for that. But they'll come eventually.

## So you're telling me there are no test either!
No no, everything is tested, you can launch the test from this link - http://sandropaganotti.github.io/adventure/test-runner.html.

## Kudos
Ultimecia for the SpriteSheet<br>
LucasArts for Monkey Island<br>

**Copyright and Licence**<br>
All assets in this repository are properties of LucasArts and copyrighted to LucasArts : Monkey Island® ©LucasArts ALL RIGHTS RESERVED.

All code in this repository is released under the terms of the MIT license.

## Changelog

02 aug 15: added directions to movement.