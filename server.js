var express = require("express");
var app = express();
var server = require("http").Server(app);
const port = 3000;

server.listen(port, function() {
  console.log("app listening on *:" + port);
  console.log("socket server will be on *:" + port);
});

app.use(express.static("dist"));
