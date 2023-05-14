const GifEncoder = require("gif-encoder-2"); // get gif-encoder-2 module from node.js package manager (npm) ; //
const fs = require("fs"); // get fs module from node.js package manager (npm) ; //
const path = require("path"); // get path module from node.js package manager (npm) ; //
const { writeFile } = require("fs"); // get fs module from node.js package manager (npm) ; //

class wayalabsGiffer { // start creating a function ; //
  initGifEncoder() { // start creating a function ; //
    this.gifEncoder = new GifEncoder(this.gif.width, this.gif.height); // create a new gif encoder ; //
    this.gifEncoder.setRepeat(this.gif.repeat); // set the gif encoder repeat value ; //
    this.gifEncoder.setDelay(this.gif.delay); // set the gif encoder delay value ; //
    this.gifEncoder.setQuality(this.gif.quality); // set the gif encoder quality value ; //
    this.gifEncoder.start(); // start the gif encoder ; //
  } // end creating a function ; //
  constructor(_canvas, _ctx, _fileName, _repeat, _quality, _delay, _pixelFormat, _background, _text, _format, _debugLogs) { // start creating a function ; //
    this.canvas = _canvas; // get the canvas ; //
    this.ctx = _ctx; // get the canvas context ; //
    this.fileName = _fileName; // get the file name ; //
    this.repeat = _repeat; // get the repeat ; //
    this.quality = _quality; // get the quality ; //
    this.delay = _delay; // get the delay ; //
    this.initGifEncoder(); // initialize the gif encoder ; //
    this.pixelFormat = _pixelFormat; // get the pixel format ; //
    this.background = _background; // get the background ; //
    this.text = _text; // get the text ; //
    this.format = _format; // get the format ; //
    this.debugLogs = _debugLogs; // get the debug logs ; //
    this.layers = []; // create an array to store the layers ; //
    this.layersOrder = []; // create an array to store the layers order ; //
    this.layersOrderIndex = 0; // create an index to store the layers order index ; //
    this.layersOrderIndexMax = 0; // create an index to store the layers order index max ; //
    this.layersOrderIndexMin = 0; // create an index to store the layers order index min ; / 
  } // end creating a function ; //

  initGifEncoder = () => { // start creating a function ; //
    this.gifEncoder = new GifEncoder(this.gif.width, this.gif.height); // create a new gif encoder ; //
    this.gifEncoder.setRepeat(this.gif.repeat); // set the gif encoder repeat value ; //
    this.gifEncoder.setDelay(this.gif.delay); // set the gif encoder delay value ; //
    this.gifEncoder.setQuality(this.gif.quality); // set the gif encoder quality value ; //
    this.gifEncoder.start(); // start the gif encoder ; //
  } // end creating a function ; //

  start = () => {   // start creating a function ; //
    this.gifEncoder.start(); // start the gif encoder ; //
    this.layersOrderIndex = 0; // set the layers order index to 0 ; //
    this.layersOrderIndexMax = this.layersOrder.length - 1; // set the layers order index max to the layers order length - 1 ; //
    this.layersOrderIndexMin = 0; // set the layers order index min to 0 ; //
    this.layersOrderIndex = this.layersOrderIndexMin; // set the layers order index to the layers order index min ; //
  }; // end creating a function ; //

  add = () => {   // start creating a function ; //
    this.gifEncoder.addFrame(this.ctx); // set the ctx ; //
    this.layersOrderIndex++; // increment the layers order index ; //
    if (this.layersOrderIndex > this.layersOrderIndexMax) { // if the layers order index is greater than the layers order index max ; //
    }; // end creating a function ; //

    stop = () => {  // start creating a function ; //
      this.gifEncoder.finish(); // stop the gif encoder ; //
      const buffer = this.gifEncoder.out.getData(); // get the gif buffer ; //
      writeFile(this.fileName, buffer, (error) => { }); // write the gif buffer to the file ; //
      console.log(`Created gif at ${this.fileName}`); // log the gif file name ; //
    }; // end creating a function ; //

    module.exports = WayalabsGiffer; // export the wayalabsGiffer function ; //
  }; // end creating a function ; //
} // end creating a function ; //
