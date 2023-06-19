const { MongoClient, ServerApiVersion } = require('mongodb');
const Either = require('../models/Either')
const Left = require('../models/Left.js')
const ServerResponse = require('../models/ServerResponse.js')
const Right = require('../models/Right.js')
const uri = "mongodb+srv://larakanevsky:dongato@cluster0.uwuoyog.mongodb.net/?retryWrites=true&w=majority";

class MongoDBDAO{
  constructor(tableName,entityValidator){
      this.client = new MongoClient(uri, {
          serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
          }
        });
      this.db = this.client.db("mudle");
      this.coleccion=this.db.collection(tableName);
      this.entityValidator = entityValidator??(()=>{return true});
  }

  async insert(objeto){
    try{
      let isValid = await this.entityValidator(objeto,this)
      if(isValid.isLeft()){
        return Either.left(new ServerResponse(400,isValid.getLeft()))
      }
      
      const resultado = await this.coleccion.insertOne(objeto);
  
      return this.resultIsSuccessful(resultado)?Either.right(new ServerResponse(201)):Either.left(new ServerResponse(500,["Error inserting to DB."]))
    }catch(exception){
      return Either.left(new ServerResponse(500,[exception]))
    }
  }

  async update(objeto) {
    const filter = { id: objeto.id };
    const update = { $set: objeto};

    const result = await this.coleccion.updateOne(filter, update);

    return this.resultIsSuccessful(result)?Either.right(objeto):Either.left("No se actualizo correctamente")
  }

  async delete(id){

    // const filter = { id:{$eq: id} };
    const result = await this.coleccion.deleteMany();
  
    console.log(`${result.deletedCount} document(s) deleted.`);
    return this.resultIsSuccessful(result)?Either.right(id):Either.left("No se borro correctamente")
  }

  async read(filtro){
    try{
      const resultado = await this.coleccion.find(filtro).toArray();
      console.log("resultado",resultado)
      return this.resultIsSuccessful(resultado)?Either.right(new ServerResponse(200,[],resultado)):Either.left(new ServerResponse(500,["Error reading from DB."]));
    }catch(exception){
      return Either.left(new ServerResponse(500,[exception]))
    }
  }

    resultIsSuccessful(result){
      return result.acknowledged || result.length!=null;
    }
}
module.exports = MongoDBDAO;
// async function run() {
//   try {
//     await this.client.connect();
//     await this.client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await this.client.close();
//   }
// }
// run().catch(console.dir);
