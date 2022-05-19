const basePath = process.cwd(); // get current working directory path (where index.js is) ; //
const fs = require("fs"); // get fs module from node.js package manager (npm) ; // 
const { createCanvas, loadImage } = require("canvas"); // get canvas and image modules from canvas module in node.js package manager (npm) ; //
const buildDir = `${basePath}/build`; // get build directory path ; //
  

const { preview } = require(`${basePath}/src/config.js`);

// read json data from config.js file and save it to a variable called _data .length is the number of NFTs in the project.  //
const rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`); // read the json file ; //
const metadataList = JSON.parse(rawdata); // parse the json file ; //

const saveProjectPreviewImage = async (_data) => {
  // Extract from preview config .js file ; //
  const { thumbWidth, thumbPerRow, imageRatio, imageName } = preview; // get the config values ; //
  // Calculate height on the fly directory ; //
  const thumbHeight = thumbWidth * imageRatio;
  // Prepare canvas for the preview image ; //
  const previewCanvasWidth = thumbWidth * thumbPerRow; // calculate the width of the canvas ; //
  const previewCanvasHeight = height = thumbHeight * Math.ceil(_data.length / thumbPerRow); // calculate the height of the canvas ; //
    thumbHeight * Math.ceil(_data.length / thumbPerRow); // calculate the height of the canvas ; //
  // Shout from the mountain tops directory ; //
  console.log( // shout from the mountain tops directory ; //
    `Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} thumbnails.` // shout from the mountain tops directory ; //
  ); // shout from the mountain tops directory ; //

  // Initiate the canvas now that we have calculated everything ; //
  const previewPath = `${buildDir}/${imageName}`; // get the preview image path ; //
  const previewCanvas = createCanvas(previewCanvasWidth, previewCanvasHeight); // create the canvas ; //
  const previewCtx = previewCanvas.getContext("2d"); // get the canvas context ; //

  // Iterate all NFTs and insert thumbnail into preview image ; //
  // Don't want to rely on "edition" for assuming index order ; //
  for (let index = 0; index < _data.length; index++) { // iterate all NFTs ; //
    const nft = _data[index]; // get the NFT ; //
    await loadImage(`${buildDir}/images/${nft.edition}.png`).then((image) => { // load the image ; //
      previewCtx.drawImage( _imgObject.loadedImage, // draw the image ; //
        image, // image object ; //
        thumbWidth * (index % thumbPerRow), // x position ; //
        thumbHeight * Math.trunc(index / thumbPerRow), // y position ; //
        thumbWidth, // width ; //
        thumbHeight * Math.trunc(index / thumbPerRow), // height ; //
      ); // draw the image ; //
    }); //  load the image ; //
  } // iterate all NFTs ; //

  // Write Project Preview to file ; //
  fs.writeFileSync(previewPath, previewCanvas.toBuffer("image/png")); // write the preview image to file ; //
  console.log(`Project preview image located at: ${previewPath}`); // shout from the mountain tops directory ; //
}; // saveProjectPreviewImage ; //

saveProjectPreviewImage(metadataList); // saveProjectPreviewImage ; //
