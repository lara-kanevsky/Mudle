const { MongoClient, ServerApiVersion,ObjectId  } = require('mongodb');
const Either = require('../models/Either')
const Left = require('../models/Left.js')
const ServerResponse = require('../models/ServerResponse.js')
const Right = require('../models/Right.js')
const Utils = require('../models/Utils')

const uri = "mongodb+srv://larakanevsky:dongato@cluster0.uwuoyog.mongodb.net/?retryWrites=true&w=majority";

class MongoDBDAO{
  constructor(tableName,entityValidator,getInstance){
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
      this.getInstance = getInstance??(()=>({}));
  }

  async insert(objeto){
    try{
      let isValid = await this.entityValidator(objeto,this)
      if(isValid.isLeft()){
        return Either.left(new ServerResponse(400,isValid.getLeft()))
      }
      let toInsert =this.getInstance(objeto);
      const resultado = await this.coleccion.insertOne(toInsert);
      return this.resultIsSuccessful(resultado)?Either.right(new ServerResponse(201,[],resultado)):Either.left(new ServerResponse(500,["Error inserting to DB."]))
    }catch(exception){
      return Either.left(new ServerResponse(500,[exception]))
    }
  }

  async update(id,objeto,updateObj) {
    console.log("id to update:",id)
    const filter = { _id: new ObjectId(id) };
    const update =updateObj?? { $set: objeto};

    const result = await this.coleccion.updateOne(filter, update);
    return this.resultIsSuccessful(result)?Either.right(result):Either.left("No se actualizo correctamente")
  }

  // async delete(id){

  //   // const filter = { id:{$eq: id} };
  //   const result = await this.coleccion.deleteMany();
  
  //   console.log(`${result.deletedCount} document(s) deleted.`);
  //   return this.resultIsSuccessful(result)?Either.right(id):Either.left("No se borro correctamente")
  // }

  async read(filtro){
    try{
      console.log("filtro",filtro)
      if (typeof filtro === 'string') {
        filtro = { _id: new ObjectId(filtro) };
      }else if(Utils.isArrayLike(filtro) ){
        filtro = { _id: { $in: filtro.map(id => new ObjectId(id)) } };
      }
      console.log("EL FILTRO ES:",filtro)
      const resultado = await this.coleccion.find(filtro).toArray();
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
