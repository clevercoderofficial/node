const MongoClient = require('mongodb').MongoClient;
reqrire('dotenv').config()

MongoClient.connect(process.env.MONGODB_CONNECT, (err, db) => {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});