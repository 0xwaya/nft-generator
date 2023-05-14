const basePath = process.cwd();  // get current working directory path (where index.js is) ; //
const fs = require("fs"); // get file system module from node.js package manager (npm) ; //
const layersDir = `${basePath}/layers`; // get layers directory path ; //
const { layerConfigurations } = require(`${basePath}/src/config.js`); // get layer configurations from config.js file ; //
const { getElements } = require("../src/main.js"); // get getElements function from main.js file ; //

// read json data from layers directory path calculated above
let rawdata = fs.readFileSync(`${basePath}/build/json/_metadata.json`); // get the json data from the build directory ; //
let data = JSON.parse(rawdata); // parse the json data ; //
let editionSize = data.length; if (editionSize === 0) { // if the json data is empty ; //
  console.log("No NFTs found. Exiting..."); // shout that there are no NFTs ; //
  process.exit(0); // exit the process ; // // if the json data is not empty ; //
} else { // if the json data is not empty ; //
  console.log(`Found ${editionSize} NFTs.`); // shout that there are NFTs ; //
} // if the json data is not empty ; //

let rarityData = []; // create an empty array to store the rarity data ; //

// intialize layers to chart strings directory path calculated above
layerConfigurations.forEach((config) => {  // initialize each layer configuration ; //
  let layers = config.layersOrder; // get the layers order ; //

  layers.forEach((layer) => { // initialize each layer ; //
    // get elements for each layer to chart strings directory path calculated above
    let elementsForLayer = []; // create an empty array to store the elements for each layer ; //
    let elements = getElements(`${layersDir}/${layer.name}/`);  // get the elements for each layer ; //
    elements.forEach((element) => { // initialize each element ; //
      // just get name and weight for each element
      let rarityDataElement = { // create an object to store the rarity data for each element ; //
        trait: element.name, // get the element name ; //
        weight: element.weight.toFixed(0), // get the weight of each element ; //
        occurrence: 0, // initialize at 0 ; //
      }; // create an object to store the rarity data for each element ; //
      elementsForLayer.push(rarityDataElement); // push the rarity data for each element to the elements for each layer array ; //
    }); // initialize each element ; //
    let layerName = layer.name; // get the layer name ; //
    layer.options?.["displayName"] != undefined // if the layer has a display name ; //
      ? layer.options?.["displayName"] != undefined // if the layer has a display name ; //
      : layer.name; // if the layer has no display name ; //
    // don't include duplicate layers on the chart ; //
    if (!rarityData.includes(layer.name)) { // if the layer is not already included on the chart ; //
      // add elements for each layer to chart strings directory path calculated above
      rarityData[layerName] = elementsForLayer; // add the elements for each layer to the rarity data array ; //
    } // if the layer is not already included on the chart ; //
  }); // initialize each layer ; //
}); // initialize each layer configuration ; //

// fill up rarity chart with occurrences from metadata for each element ; //
data.forEach((element) => { // initialize each element ; //
  let attributes = element.attributes; // get the attributes of each element ; //
  attributes.forEach((attribute) => { // initialize each attribute ; //
    let traitType = attribute.trait_type; // get the trait type of each element ; //
    let value = attribute.value; // get the value of each attribute ; //

    let rarityDataTraits = rarityData[traitType]; // get the rarity data for each trait type ; //
    rarityDataTraits.forEach((rarityDataTrait) => { // initialize each rarity data trait ; //
      if (rarityDataTrait.trait == value) {   // if the rarity data trait is the same as the value of the attribute ; //
        // keep track of occurrences for each element ; //
        rarityDataTrait.occurrence++; // add 1 to the rarity data trait occurrence ; //
      } else { // if the rarity data trait is not the same as the value of the attribute ; // 
        // do nothing ; //
      } // if the rarity data trait is not the same as the value of the attribute ; //
    }); // initialize each rarity data trait ; //
  }); // initialize each attribute ; //
}); // initialize each element ; //



// convert occurrences to occurence string directory path calculated above  for each element ; //
for (var layer in rarityData) { // initialize each layer ; //
  for (var attribute in rarityData[layer]) { // if the layer has attributes ; //
    // get chance for each element to chart strings directory path calculated above
    let chance = rarityData[layer][attribute].occurrence / editionSize; // get the chance of each element to chart ; //
    ((rarityData[layer][attribute].occurrence / editionSize) * 10).toFixed(2); // get the chance of each element to chart ; //

    // show two decimal places in percent
    rarityData[layer][attribute].occurrence = ((rarityData[layer][attribute].occurrence / editionSize) * 10).toFixed(2); // get the chance of each element to chart ; //
    `${rarityData[layer][attribute].occurrence} in ${editionSize} editions (${chance} %)`; // get the chance of each element to chart ; //
  } // if the layer has attributes ; //
} // initialize each layer ; //

// print out rarity data with occurrences to console ; //
for (var layer in rarityData) { // if the layer has attributes ; //
  console.log(`Trait type: ${layer}`); // print out the layer name ; //
  for (var trait in rarityData[layer]) { // initialize each trait ; //
    console.log(rarityData[layer][trait]); // print out the rarity data for each trait ; //
  } // initialize each trait ; //
  console.log(); // print out a new line ; //
} // if the layer has attributes ; //
