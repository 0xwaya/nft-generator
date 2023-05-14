const basePath = process.cwd();
const fs = require("fs").promises;
const path = require("path");
const { layersDir, rarityDataFile } = require("./config");
const { getElements } = require("./main");

async function readRarityData() {
  try {
    const data = await fs.readFile(rarityDataFile);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading rarity data: ${error}`);
    throw error;
  }
}

async function getRarityData() {
  const rarityData = {};
  const data = await readRarityData();
  const editionSize = data.length;

  if (editionSize === 0) {
    throw new Error("No NFTs found.");
  }

  console.log(`Found ${editionSize} NFTs.`);

  for (const config of layerConfigurations) {
    const layers = config.layersOrder;

    for (const layer of layers) {
      const elementsForLayer = [];
      const elements = await getElements(path.resolve(layersDir, layer.name));

      for (const element of elements) {
        const rarityDataElement = {
          trait: element.name,
          weight: element.weight.toFixed(0),
          occurrence: 0,
        };

        elementsForLayer.push(rarityDataElement);
      }

      const layerName = layer.options?.displayName ?? layer.name;

      if (!rarityData[layer.name]) {
        rarityData[layerName] = elementsForLayer;
      }
    }
  }

  for (const element of data) {
    const attributes = element.attributes;

    for (const attribute of attributes) {
      const traitType = attribute.trait_type;
      const value = attribute.value;
      const rarityDataTraits = rarityData[traitType];

      for (const rarityDataTrait of rarityDataTraits) {
        if (rarityDataTrait.trait == value) {
          rarityDataTrait.occurrence++;
        }
      }
    }
  }

  for (const layer in rarityData) {
    for (const attribute in rarityData[layer]) {
      const { occurrence } = rarityData[layer][attribute];
      const chance = (occurrence / editionSize) * 10;

      rarityData[layer][attribute].occurrence = chance.toFixed(2);
      rarityData[layer][attribute].chanceStr = `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance}%)`;
    }
  }

  return rarityData;
};

module.exports = {
  getRarityData,
};