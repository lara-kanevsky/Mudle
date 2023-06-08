const { MongoClient, ServerApiVersion } = require('mongodb');
const Either = require('./Either.js')
const Left = require('./Left.js')
const Right = require('./Right.js')
const uri = "mongodb+srv://larakanevsky:dongato@cluster0.uwuoyog.mongodb.net/?retryWrites=true&w=majority";

module.export = class MongoDBDAO{
  constructor(tableName){
      this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
      this.db = client.db("mudle");
      this.coleccion=this.db.collection(tableName);
  }

  async insert(objeto){
    const resultado = await coleccion.insertOne(objeto);
    return this.resultIsSuccessful(resultado)?Either.right(objeto):Either.left("No se inserto correctamente")
  }

  async update(objeto) {
    const filter = { id: objeto.id };
    const update = { $set: objeto};

    const result = await this.coleccion.updateOne(filter, update);

    return this.resultIsSuccessful(result)?Either.right(objeto):"upsi"
  }

  async delete(id){

    const filter = { id: id };
    const result = await this.coleccion.deleteMany(filter);
  
    console.log(`${result.deletedCount} document(s) deleted.`);
    return this.resultIsSuccessful(result)?Either.right(id):"cosaron pasaas"
  }

  async read(idOFiltroONada){//separarlo antes, en el repository
    if(idOFiltroONada===undefined){

    }
      //Separar rutas, si se pasa una funcion entonces es una para filtrar. Si se pasa un id es para traer uno. Si no se pasa nada es para traer todo. (funciones separadas!!)

  const filter = { age: { $gte: 18 } };

  const documents = await this.coleccion.find(filter).toArray();
    }

    resultIsSuccessful(result){
      return result?.insertedId>0;
    }
}

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
