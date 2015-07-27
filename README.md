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
4. fire a local webserver and navigate to `adventure.html` - no webserver? [Use python](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python) `python -m SimpleHTTPServer`!

## Hey! I want to use this!
Do your really _really_ want to use this? The engine is still very young, although, IMO, pretty solid and with great aspirations.

**first you need a sprite sheet**<br>
A sprite sheet is simple an image containing some sprites, [here some examples](https://www.google.com/search?q=spritesheet&tbm=isch). Adventure works better if the single frames are marked in sequences, as shown below:<br>
<img src="http://sandropaganotti.github.io/adventure/assets/doc/guybrushWalking.png" width="400">

**how can I mark a sprite sheet?**<br>
Easy, just follow the steps below:

1. pick a color you don't use in the whole spritesheet (in the example above the color is red, `#FF0000FF` - rgba)
2. put that color in the lower-right corner of the spritesheet.
3. use that color to mark the four vertices of each frame, use a different alpha values to group sequences of frames into sprites.  
