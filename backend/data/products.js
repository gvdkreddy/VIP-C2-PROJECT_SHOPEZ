const laptops = require("./laptops");
const mobiles = require("./mobiles");
const tablets = require("./tablets");
const audio = require("./audio");
const watches = require("./watches");
const cameras = require("./cameras");
const monitors = require("./monitors");
const gaming = require("./gaming");
const keyboards = require("./keyboards");
const mouse = require("./mouse");
const storage = require("./storage");
const printers = require("./printers");
const speakers = require("./speakers");
const security = require("./security");
const clothing = require("./clothing");
const footwear = require("./footwear");
module.exports = [
  ...laptops,
  ...mobiles,
  ...tablets,
  ...audio,
  ...watches,
  ...cameras,
  ...monitors,
  ...gaming,
  ...keyboards,
  ...mouse,
  ...storage,
  ...printers,
  ...clothing,
...footwear,
  ...speakers,
  ...security,
];