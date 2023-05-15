const basePath = process.cwd();  // get current working directory path (where index.js is) ; //
const { MODE } = require(`${basePath}/constants/blend_mode.js`); // get blend_mode.js file path from current working directory ; //
const { NETWORK } = require(`${basePath}/constants/network.js`); // get network.js file path from current working directory ; //

const network = NETWORK.goerli // set network to goerli ; //
const namePrefix = "Squack";  // set namePrefix to Squack ; //
const description = "A community degen creative parrots in risk of extintion"; // set description to A community degen creative parrots in risk of extintion ; //
const baseUri = "https://nftstorage.link/ipfs/bafybeihzebqbqlmjbvdpunmrq7s733gh76avhonjmlhbov4gb2teibfng4" // set baseUri to https://nftstorage.link/ipfs/bafybeihzebqbqlmjbvdpunmrq7s733gh76avhonjmlhbov4gb2teibfng4 ; //

const goerliMetadata = { // metadata for goerli network ; //
  symbol: "MACAW", // symbol for the token ; //
  seller_fee_basis_points: 10, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://loro.vercel.app", // external url for the token
  creators: [ // Define the creators of the token
    {
      name: "catatumbo", // creator of skins, background & concept
      url: "https://loro.vercel.app", // url of the creator
      artist: "Indio Caricuao", // is the creator an artist
      address: "0x043a2d30E6C634452eD585ece72626Cd33D060Ab", // address of the creator
    },
    {
      name: "bayesty", // name of main design & layers creator
      url: "https://instagram.com/bayesty", // url of the creator
      artist: "Isobel Bjork", // is the creator an artist
      address: "0x0336743D1A5F17D8421D7E436DE7215F8347e36f", // address of the creator
    },
  ],
}; // End goerliMetadata




const layerConfigurations = [ // Define the layers you want to use in your collection here and the order they will be rendered
  { // Layer 0  - Base layer
    growEditionSizeTo: 4200, // Define how many unique NFTs on this layer can be generated (0 = unlimited)
    layersOrder: [ // Define the order of layers
      { name: "skin" }, // Skin layer
      { name: "eyebase" }, // Eyebase layer
      { name: "eyes" }, // Eyes layer
      { name: "beak" }, // Beak layer
      { name: "beard" }, // Beard layer
      { name: "body" }, // Body layer
      { name: "item" }, // Item layer

    ], // End layersOrder
  }, // End Layer 0
]; // End layerConfigurations

const shuffleLayerConfigurations = false; // set to true to shuffle the layers order

const debugLogs = false; // set to true to enable debug logs

const format = { // Define the format of the gif
  width: 500, // width of the gif
  height: 500, // height of the gif
  smoothing: true, // set to true to enable smoothing
}; // End format

const gif = { // Define the gif options the gif encoder will use to create the gif file
  export: true, // set to true to export the gif file to the local directory
  repeat: 0,  // set to true to repeat the gif
  quality: 100, // quality of the gif
  delay: 100, // delay between frames
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
  compression: 0, // compression of the image (1-9) 1 = best speed, 9 = best compression, 0 = no compression
  ratio: 31 / 128, // Define the ratio of the image to the thumbnail (height / width) - 21 / 128 = 128x128  -  1 / 1 = 500x500  
}; // repeat for each layer

const background = { // Define the background of the image
  generate: true, // Generate a background
  brightness: "80%", // Define the brightness of the background
  static: false, // Define if the background will be static
  color: "#ffbdde",
  color: "#b452ff",
  color: "#52ffff",
  color: "#ffff52",
  color: "#eadbc8",
  color: "#ff5252",
  color: "#C0C0C0",
  color: "#C5A3FF",
  color: "#FCC2FF",
  color: "#C5A3FF",
  color: "#FCC2FF",
  color: "#BFFCC6",
  color: "#FFCBC1",
  color: "#AFCBFF",
  color: "#E7FFAC",
  color: "#FFC1FF",
  color: "#C4FAF8",

}; // repeat for each layer

const extraMetadata = {}; // Define extra metadata for the image to the user (e.g. artist, copyright, etc.)

const rarityDelimiter = "#"; // Define the delimiter for the rarity of the image to the thumbnail

const uniqueDnaTorrance = 4200; // Define the number of unique dna torrance to generate

const preview = { // Define the preview settings
  thumbPerRow: 40, // Define how many thumbnails per row
  thumbWidth: 100, // Define the width of the thumbnail
  imageRatio: format.height / format.width,  // Define the ratio of the image to the thumbnail (height / width)
  imageName: "preview.png", // Define the name of the preview image
}; // end preview

const preview_gif = { // Define the preview gif settings
  numberOfImages: 20, // Define how many images you want in the gif
  order: "ASC", // ASC, DESC, MIXED - Define the order of the images in the gif
  repeat: 0, // Define how many times the gif will repeat
  quality: 100, // Define the quality of the gif
  delay: 100, // Define the delay between each frame 
  imageName: "editionPreview.gif", // Define the name of the preview gif
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
  goerliMetadata,
  gif,
  preview_gif,
};
