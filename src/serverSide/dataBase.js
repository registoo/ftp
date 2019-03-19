const Datastore = require("nedb");

const db = new Datastore({ filename: "users.db" });

const f = () => {
  db.loadDatabase();
  db.insert({ system: "solar", puk: "puk" });
  db.find({ "completeData.planets.name": "Mars" }, function(err, docs) {
    if (err) console.log("error DB: ", err);
    console.dir(docs, { depth: null });
  });
};

module.exports = f;
