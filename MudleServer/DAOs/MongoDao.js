const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://larakanevsky:dongato@cluster0.uwuoyog.mongodb.net/?retryWrites=true&w=majority";

module.exports = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});