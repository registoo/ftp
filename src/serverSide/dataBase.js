const entryFileDB = require("../../constants.js").filesSHA1;
const path = require("path");
const colors = require("colors/safe");

const fileName = path.join("./src/serverSide/", entryFileDB);

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Claster0_first_user:SVy88HHxf3vR6zH@cluster0-fko02.mongodb.net/test?retryWrites=true";

mongoose.connect(
  uri,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", err => {
  console.log(
    `>>> error in ${colors.yellow(
      "src/serverSide/dataBase.js"
    )}\r\nmongoDB connection error:\r\n${err}`
  );
});
mongoose.connection.once("open", function() {
  console.log("we're connected!");
});

var kittySchema = new mongoose.Schema({
  fileName: String,
  hash: String
});
var Kitten = mongoose.model("Kitten", kittySchema);
var silence = new Kitten({ name: "Silence", hash: "123" });
silence.save(err => {
  if (err) console.log(err);
  console.log("сохранено");
});

// module.exports = db;
