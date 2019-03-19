const Datastore = require("nedb");

const db = new Datastore({ filename: "users.db" });

const f = () => {
  db.loadDatabase();
  db.update(
    { system: "solnezcnaya system" },
    { $unset: { planet: true } },
    { multi: true },
    function(err, docs) {
      if (err) console.log("error DB: ", err);
      console.dir(docs, { depth: null });
    }
  );
  db.find().exec((err, d) => console.log(d));
};

module.exports = f;
