const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://larakanevsky:dongato@cluster0.uwuoyog.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
async function insertar(){
    const myDB = client.db("mudle");
    const myColl = myDB.collection("usuarios");
    const doc = { nombre: "Lara Kañevsky", mail: "larakanevsky@gmail.com",password:"lare" };
    const result = await myColl.insertOne(doc);
    console.log(
       `A document was inserted with the _id: ${result.insertedId}`,
    );
}

insertar()