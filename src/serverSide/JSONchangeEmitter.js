const EventEmitter = require("events");
class FileChangeEmitter extends EventEmitter {}

const JSONchange = new FileChangeEmitter();

JSONchange.on("change", e => {
  console.log("change: ", e ? e : null);
});
module.exports = JSONchange;
