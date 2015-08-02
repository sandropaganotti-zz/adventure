import Sprite from '../../js/sprite.js';

const sheetPath = './assets/sprite-sheets/guybrush.png';

export default function guybrush(){
  return {
    walkingRight: new Sprite({
      sheet: {
        name: sheetPath,
        sequence: {
          key: 252,
          duration: 100
        }
      }
    }),
    walkingLeft: new Sprite({
      sheet: {
        name: sheetPath,
        flipHorizontally: true,
        sequence: {
          key: 252,
          duration: 100
        }
      }
    }),
    waiting: new Sprite({
      sheet: {
        name: sheetPath,
        sequence: {
          key: 249,
          duration: 100
        }
      }
    })
  };
}
