const basePath = process.cwd();   // get current working directory path (where index.js is) ; // 
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`); // get main.js file path from current working directory

(() => { // start creating a function ; //
  buildSetup(); // setup the environment gif-encoder-2 ; // get the environment gif-encoder-2 ; //
  
  startCreating();  // start creating the gif ; // get the gif ; // 
})(); // run the code immediately after the file is loaded ; //
