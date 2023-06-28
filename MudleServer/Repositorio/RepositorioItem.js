const DAO = require("../DAOs/MongoDao.js")
const {ObjectId} = require('mongodb');

class RepositorioUsuario{
    constructor() {
        this.dao = DAO;
    }
    
    async getItemsFromIds(arrayIds){
        let items = await this.dao.db("mudle").collection("items");
        return await items.find({ _id: { $in: arrayIds } }).toArray();
    }

    async insertarItem(item){
        let items = await this.dao.db("mudle").collection("items");
        return await items.insertOne(item)    
    }
}

module.exports = RepositorioUsuario;