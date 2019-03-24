const entryFileDB = require("../../constants.js").filesSHA1;
const path = require("path");
const errorModule = require("./helpers/cuteErrorModule.js");
const mongoose = require("mongoose");

const fileName = path.join("./src/serverSide/", entryFileDB);

const uri = "mongodb+srv://Claster0_first_user:SVy88HHxf3vR6zH@cluster0-fko02.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.on("error", err => {
	errorModule(__filename, "mongoDB connection error:", err);
});
mongoose.connection.once("open", function() {
	console.log("we're connected!");
});

var kittySchema = new mongoose.Schema({
	fileName: String,
	hash: String,
});

var Kitten = mongoose.model("bobes", kittySchema);
Kitten.find({ fileName: /new B/ }, (err, kittens) => {
	if (err) return console.error(err);
	console.log(kittens);
});
