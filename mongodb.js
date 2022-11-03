const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/admin";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});