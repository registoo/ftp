const entryFileDB = require("../../constants.js").filesSHA1;
const path = require("path");
const errorModule = require("./helpers/cuteErrorModule.js");

const fileName = path.join("./src/serverSide/", entryFileDB);

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Claster0_first_user:SVy88HHxf3vR6zH@cluster0-fko02.mongodb.net/test?retryWrites=true";
mongoose.connect(
  uri,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", err => {
  errorModule(__filename, "mongoDB connection error:", err);
});
mongoose.connection.once("open", function() {
  console.log("we're connected!");
});

var kittySchema = new mongoose.Schema({
  fileName: String,
  hash: String,
  pip: { type: Number, required: true }
});

var Kitten = mongoose.model("Kitten", kittySchema);
var silence = new Kitten({ fileName: "Silenceууууууууууууууууу", hash: "5" });
silence.save(err => {
  if (err) console.log(err);
  console.log("сохранено");
});

// module.exports = db;
const a = mongoose.model("kittens", kittySchema);
const sli = new a({ fileName: "troubles", pip: 717 });
