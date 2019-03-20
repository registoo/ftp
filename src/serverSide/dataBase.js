const Datastore = require("nedb");
const entryFileDB = require("../../constants.js").filesSHA1;
const path = require("path");

const fileName = path.join("./src/serverSide/", entryFileDB);
const db = new Datastore({ filename: fileName });

db.loadDatabase();

module.exports = db;
