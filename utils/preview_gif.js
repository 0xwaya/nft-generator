const basePath = process.cwd();
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const buildDir = `${basePath}/build`;
const imageDir = `${buildDir}/images`;
const { format, preview_gif } = require(`${basePath}/src/config.js`);
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");
const WayalabsGiffer = require(`${basePath}/modules/WayalabsGiffer`);

const wayalabsGiffer = new WayalabsGiffer(
  canvas,
  ctx,
  `${buildDir}/${preview_gif.imageName}`,
  preview_gif.width,
  preview_gif.height,
  preview_gif.numberOfImages,
  preview_gif.order,
  preview_gif.repeat,
  preview_gif.quality,
  preview_gif.delay,
  preview_gif.imageName
);

const loadImg = async (_img) => {
  const loadedImage = await loadImage(_img);
  return { loadedImage };
};

const getImageList = async () => {
  const files = await fs.promises.readdir(imageDir);
  const imagePromises = files.map(file => loadImg(`${imageDir}/${file}`));
  return Promise.all(imagePromises);
};

const saveProjectPreviewGIF = async (_data) => {
  const { numberOfImages, order, repeat, quality, delay, imageName } = preview_gif;
  const { width, height } = format;
  const previewCanvasWidth = width;
  const previewCanvasHeight = height;

  if (_data.length < numberOfImages) {
    console.log(`You do not have enough images to create a gif with ${numberOfImages} images.`);
  } else {
    console.log(`Preparing a ${previewCanvasWidth}x${previewCanvasHeight} project preview with ${_data.length} images.`);
    const previewPath = `${buildDir}/${imageName}`;

    ctx.clearRect(0, 0, width, height);

    const giffer = new WayalabsGiffer({
      canvas,
      path: previewPath,
      repeat,
      quality,
      delay,
    });

    for (const renderObject of _data.slice(0, numberOfImages)) {
      if (Object.hasOwnProperty.call(renderObject, "loadedImage")) {
        const { loadedImage } = renderObject;
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
        ctx.drawImage(loadedImage, 0, 0, previewCanvasWidth, previewCanvasHeight);
        giffer.add();
      }
    }

    giffer.stop();
  }
};

(async () => {
  const imageList = await getImageList();
  await saveProjectPreviewGIF(imageList);
})();