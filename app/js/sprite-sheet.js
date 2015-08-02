import {isEqual} from './util.js';

class SpriteSheet{
  constructor(){
    this.sheets = {};
  }
    
  get({path}){
    return new Promise(resolve => {
      Object.keys(this.sheets).indexOf(path) !== -1 ? 
        resolve(this.sheets[path]) :
        this.load({path: path})
          .then(sheet => {
            this.sheets[path] = sheet;
            resolve(sheet);
          });
    });
  }
  
  load({path, alpha}){
    return new Promise(resolve => {
      let sheet = new Image();
      sheet.onload = () => {
        let context = document.createElement('canvas').getContext('2d');
        context.canvas.width = sheet.width;
        context.canvas.height = sheet.height;
        context.drawImage(sheet,0,0);
        let imageData = context.getImageData(0,0,sheet.width,sheet.height);
        let {image, sequences} = this.process(imageData);
        context.putImageData(image,0,0);
        resolve({image: context.canvas, sequences: this.sequences(sequences)});
      };
      sheet.src = path;
    });
  }
  
  process(image){
    let data = image.data, length = image.data.length;
    let alpha = [data[0],data[1],data[2]];
    let marker = [data[length-4],data[length-3],data[length-2]];
    let hasMarker = !isEqual(marker,alpha);
    let sequences = {};
    for(let i=0; i<data.length; i+=4){
      let pixel = [data[i],data[i+1],data[i+2]];
      if( hasMarker && isEqual(marker, pixel) && data[i+3] !== 255 ){
        sequences[data[i+3]] = sequences[data[i+3]] || [];
        sequences[data[i+3]].push([(i/4) % image.width,Math.floor((i/4) / image.width)]);
      }
      if(isEqual(alpha, pixel)){
        data[i+3] = 0;
      }
    }
    return {image: image, sequences: Object.keys(sequences).length === 0 ? null : sequences };
  }

  sequences(sequences){
    return !sequences ? null : Object.keys(sequences).reduce((frames,key) => {
      let seq = sequences[key].sort((pixel1, pixel2) => (pixel1[0] + pixel1[1]/1000) - (pixel2[0] + pixel2[1]/1000));
      frames[key] = [];
      for(let i = 0; i < seq.length; i+=4){
        frames[key].push({
          id: i/4,
          top: seq[i][1] + 1,
          left: seq[i][0] + 1,
          width: seq[i+2][0] - seq[i][0] - 1,
          height: seq[i+1][1] - seq[i][1] - 1,
        });
      }
      return frames;
    }, {});
  }

}

export default new SpriteSheet();