const DAO = require("../DAOs/MongoDao.js")
const {ObjectId} = require('mongodb');

class RepositorioEvento{
    constructor() {
        this.dao = DAO;
    }

    async getEventoById(eventoId) {
        let eventos = await this.dao.db("mudle").collection("eventos");
        return await eventos.findOne({ _id: new ObjectId(eventoId) })
    }

    async insertarEvento(evento) {
        let eventos = await this.dao.db("mudle").collection("eventos");
        return await eventos.insertOne(evento)
    }

    async actualizarEvento(idEvento, evento) {
        let eventos = await this.dao.db("mudle").collection("eventos");
        idEvento = new ObjectId(idEvento);
        return await eventos.updateOne({ _id: idEvento }, { $set: evento });
    }
}

module.exports = RepositorioEvento;