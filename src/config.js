const basePath = process.cwd();  // get current working directory path (where index.js is) ; //
const { MODE } = require(`${basePath}/constants/blend_mode.js`); // get blend_mode.js file path from current working directory ; //
const { NETWORK } = require(`${basePath}/constants/network.js`); // get network.js file path from current working directory ; //

const network = NETWORK.eth;  // set network to avax ; //
const namePrefix = "Macaw Tree Club House";  // set name prefix to Macaw Tree Club House ; //
const description = "A community degen creative parrots in risk of extintion"; // set description to A community degen creative parrots in risk of extintion ; //
const baseUri = "ipfs://NewUriToReplace"; // replace with IPFS / ARWEAVE uri ; // 
 
const solanaMetadata = { // metadata for Avalanche ; //
  symbol: "MAC", // symbol for the token ; //
  seller_fee_basis_points: 100, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://...", // external url for the token
  creators: [ // Define the creators of the token
    {
      name: "@cavetorch", // name of the creator
      url: "https://wayalabs.com", // url of the creator
      artist: "@Bjork, @cavetorch", // is the creator an artist
      url: "https://...", // url of the creator
      address: "0x0000000000000000000000000000000000000000", // address of the creator
      share: 5, // % of the token that the creator owns
    }, // repeat for each creator
  ], 
}; // repeat for each token
// If you have selected Solana then the collection starts from 0 automatically
// If you have selected Avax then the collection starts from 1 automatically
// If you have selected ARweave then the collection starts from 1 automatically

const layerConfigurations = [ // Define the layers you want to use in your collection here and the order they will be rendered
  { // Layer 0  - Base layer
    growEditionSizeTo: 1000, // 10 is the max number of editions
    layersOrder: [ // Define the order of layers
      { name: "Background" }, // Background layer
      { name: "skin" }, // Skin layer
      { name: "eyebase" }, // Eyebase layer
      { name: "eyes" }, // Eyes layer
      { name: "beak" }, // Beak layer
      { name: "beard" }, // Beard layer
      { name: "body" }, // Body layer
    ], // End layersOrder
  }, // End Layer 0
]; // End layerConfigurations

const shuffleLayerConfigurations = false; // set to true to shuffle the layers order

const debugLogs = false; // set to true to enable debug logs

const format = { // Define the format of the gif
  width: 1000, // width of the gif
  height: 1000, // height of the gif
  smoothing: true, // set to true to enable smoothing
}; // End format
     
const gif = { // Define the gif options the gif encoder will use to create the gif file
  export: true, // set to true to export the gif file to the local directory
  repeat: 0,  // set to true to repeat the gif
  quality: 100, // quality of the gif
  delay: 500, // delay between frames
}; // End gif

const text = { // Define the text options the gif encoder will use to create the gif file
  only: false, // set to true to only render the text
  color: "#ffffff", // color of the text
  size: 20, // size of the text
  xGap: 40, // distance between the text and the left side of the gif
  yGap: 40, //  gap between text and canvas
  align: "left", // align of the text
  baseline: "top",  // baseline of the text
  weight: "regular", // weight of the text
  family: "Courier", // font family of the text
  spacer: " => ", // spacer between the text
}; // End text

const pixelFormat = { // Define the pixel format of the image
  type: "png", // type of the image
  quality: 100, // quality of the image
  compression: 0, // compression of the image
  ratio: 34 / 128, // Define the ratio of the image
}; // repeat for each layer

const background = { // Define the background of the image
  generate: true, // Generate a background
  brightness: "80%", // Define the brightness of the background
  static: true, // Define if the background will be static
  color: "#ffbdde",  
  color: "#b452ff",
  color: "#52ffff",
  color: "#ffff52",
  color: "#eadbc8",
  color: "#ff5252",
  color: "#C0C0C0",
}; // repeat for each layer

const extraMetadata = {}; // Define extra metadata for the image to the user (e.g. artist, copyright, etc.)

const rarityDelimiter = "#"; // Define the delimiter for the rarity of the image to the thumbnail

const uniqueDnaTorrance = 1000; // Define the number of unique dna torrance to generate

const preview = { // Define the preview settings
  thumbPerRow: 5, // Define how many thumbnails per row
  thumbWidth: 50, // Define the width of the thumbnails
  imageRatio: format.height / format.width,  // Define the ratio of the image to the thumbnail (height / width)
  imageName: "preview.png", // Define the name of the preview image
}; // end preview

const preview_gif = { // Define the preview gif settings
  numberOfImages: 5, // Define how many images you want in the gif
  order: "ASC", // ASC, DESC, MIXED - Define the order of the images in the gif
  repeat: 1, // Define how many times the gif will repeat
  quality: 100, // Define the quality of the gif
  delay: 500, // Define the delay between each frame
  imageName: "preview.gif", // Define the name of the preview gif
}; // end preview_gif 

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
