const DAO = require("../DAOs/MongoDao.js")
const {ObjectId} = require('mongodb');

class RepositorioEvento{
    constructor() {
        this.dao = DAO;
    }

    async connect() {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.collection = this.db.collection('eventos');
    }

    async close() {
        await this.client.close();
    }
    
    async getEvento(eventoId) {
        await this.connect();
        const evento = await this.collection.findOne({ _id: ObjectId(eventoId) });
        this.close();
        return evento;
    }

    async getEventoById(id) {
        await this.connect();
        const evento = await this.collection.findOne({ _id: ObjectId(id) });
        this.close();
        return evento;
    }

    async insertarEvento(evento) {
        await this.connect();
        const result = await this.collection.insertOne(evento);
        this.close();
        return result.insertedId;
    }

    async actualizarEvento(idEvento, eventoActualizado) {
        await this.connect();
        const result = await this.collection.updateOne(
            { _id: ObjectId(idEvento) },
            { $set: eventoActualizado }
        );
        this.close();
        return result.modifiedCount;
    }

    async eliminarEvento(idEvento) {
        await this.connect();
        const result = await this.collection.deleteOne({ _id: ObjectId(idEvento) });
        this.close();
        return result.deletedCount;
    }
}

module.exports = RepositorioEvento;