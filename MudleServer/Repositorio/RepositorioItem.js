const DAO = require("../DAOs/MongoDao.js")
const {ObjectId} = require('mongodb');

class RepositorioItem{
    constructor() {
        this.dao = DAO;
    }

    async getItemFromId(itemId){
        let items = await this.dao.db("mudle").collection("items");
        return await items.find({ _id: itemId });
    }
    
    async getItemsFromIds(arrayIds) {
        let items = await this.dao.db("mudle").collection("items");
        return await items.find({ _id: { $in: arrayIds.map(id => new ObjectId(id)) } }).toArray();
    }

    async insertarItem(item){
        let items = await this.dao.db("mudle").collection("items");
        return await items.insertOne(item)    
    }

    async actualizarItem(idItem, itemActualizado) {
        let items = await this.dao.db("mudle").collection("items");
        idItem = new ObjectId(idItem);
        return await items.updateOne({ _id: idItem }, { $set: itemActualizado });
    }
}

module.exports = RepositorioItem;