const fs = require("fs"); // get the build directory path node.js package manager (npm) ; //
const path = require("path"); // get the build directory path node.js package manager (npm) ; //
const { createCanvas, loadImage } = require("canvas"); // get canvas and image modules from canvas module in node.js package manager (npm) ; //
const basePath = process.cwd(); // get current working directory path (where index.js is) ; //
const buildDir = `${basePath}/build/json`; // get the build directory path node.js package manager (npm) ; //
const inputDir = `${basePath}/build/images`; // get the build directory path node.js package manager (npm) ; //
const {
  format,
  namePrefix,
  description,
  baseUri,
} = require(`${basePath}/src/config.js`);
const console = require("console");
const canvas = createCanvas(format.width, format.height); // create a canvas object ; //
const ctx = canvas.getContext("2d"); // get the canvas context ; //
const metadataList = []; // create a list of metadata objects ; //

const buildSetup = () => {  // build setup function ; //
  if (fs.existsSync(buildDir)) { // check if build directory exists ; //
    fs.rmdirSync(buildDir, { recursive: true }); // remove build directory if it exists ; //
  } // end if ; //
  fs.mkdirSync(buildDir); // create build directory ; //
}; // end buildSetup function ; //

const getImages = (_dir) => { // get images function ; //
  try { // try to get images ; //
    return fs
      .readdirSync(_dir)
      .filter((item) => {
        let extension = path.extname(`${_dir}${item}`); // get the file extension ; //
        if (extension == ".png" || extension == ".jpg") { // check if file extension is .png or .jpg ; //
          return item; //Return the file name ; //
        } // end if ; //
      })
      .map((i) => {
        return {
          filename: i,
          path: `${_dir}/${i}`,
        };
      });
  } catch {
    return null;
  }
};

const loadImgData = async (_imgObject) => {
  try {
    const image = await loadImage(`${_imgObject.path}`);
    return {
      imgObject: _imgObject,
      loadedImage: image,
    };
  } catch (error) {
    console.error("Error loading image:", error);
  }
};

const draw = (_imgObject) => {
  let w = canvas.width;
  let h = canvas.height;
  ctx.drawImage(_imgObject.loadedImage, 0, 0, w, h);
};

const addRarity = () => {
  let w = canvas.width;
  let h = canvas.height;
  let i = -4;
  let count = 0;
  let imgdata = ctx.getImageData(0, 0, w, h);
  let rgb = imgdata.data;
  let newRgb = { r: 0, g: 0, b: 0 };
  const tolerance = 15;
  const rareColorBase = "Ara genome";
  const rareColor = [
    { name: "macao", rgb: { r: 142, g: 223, b: 212 } },  // color Scarlet shade 
    { name: "militaris", rgb: { r: 128, g: 134, b: 90 } }, // color green-brown shade
    { name: "hyacinthinus", rgb: { r: 113, g: 65, b: 179 } }, // color purple shade
    { name: "ararauna", rgb: { r: 162, g: 108, b: 67 } }, // color blue-yellow shade
  ];

  while ((i += 10 * 4) < rgb.length) {
    ++count;
    newRgb.r += rgb[i];
    newRgb.g += rgb[i + 1];
    newRgb.b += rgb[i + 2];
  }

  newRgb.r = ~~(newRgb.r / count);
  newRgb.g = ~~(newRgb.g / count);
  newRgb.b = ~~(newRgb.b / count);

  let rarity = rareColorBase;

  rareColor.forEach((color) => {
    if (isNeighborColor(newRgb, color.rgb, tolerance)) {
      rarity = color.name;
    }
  });

  console.log(newRgb);
  console.log(rarity);

  return [
    {
      trait_type: "Ara genome",
      value: `rgb(${newRgb.r},${newRgb.g},${newRgb.b})`,
    },
    {
      trait_type: "Ara color",
      value: rarity,
    },
    {
      trait_type: "random edition number",
      value: randomIntFromInterval(0001, 9999),
    },
  ];
};

randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

isNeighborColor = (color1, color2, tolerance) => {
  return (
    Math.abs(color1.r - color2.r) <= tolerance &&
    Math.abs(color1.g - color2.g) <= tolerance &&
    Math.abs(color1.b - color2.b) <= tolerance
  );
};

const saveMetadata = (_loadedImageObject) => {
  let shortName = _loadedImageObject.imgObject.filename.replace(
    /\.[^/.]+$/,
    ""
  );

  let tempAttributes = [];
  tempAttributes.push(addRarity());

  let tempMetadata = {
    name: `${namePrefix} #${shortName}`,
    description: description,
    image: `${baseUri}/${shortName}.png`,
    edition: Number(shortName),
    attributes: tempAttributes,
    compiler: "WayaLabs NFT Generator",
  };
  fs.writeFileSync(
    `${buildDir}/${shortName}.json`,
    JSON.stringify(tempMetadata, null, 2)
  );
  metadataList.push(tempMetadata);
};

const writeMetaData = (_data) => {
  fs.writeFileSync(`${buildDir}/_metadata.json`, _data);
};

const startCreating = async () => {
  const images = getImages(inputDir);
  if (images == null) {
    console.log("Please generate collection first.");
    return;
  }
  let loadedImageObjects = [];
  images.forEach((imgObject) => {
    loadedImageObjects.push(loadImgData(imgObject));
  });
  await Promise.all(loadedImageObjects).then((loadedImageObjectArray) => {
    loadedImageObjectArray.forEach((loadedImageObject) => {
      draw(loadedImageObject);
      saveMetadata(loadedImageObject);
      console.log(
        `Created metadata for image: ${loadedImageObject.imgObject.filename}`
      );
    });
  });
  writeMetaData(JSON.stringify(metadataList, null, 2));
};

buildSetup();
startCreating();
