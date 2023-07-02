const DAO = require("../DAOs/MongoDao.js")
const {ObjectId} = require('mongodb');

class RepositorioUsuario{
    constructor() {
        this.dao = DAO;
    }

    async getUserById(idUser){
        let usuarios = await this.dao.db("mudle").collection("usuarios");
        return await usuarios.findOne({ _id: new ObjectId(idUser) })
    }
    
    async getUserByEmail(userMail){
        await this.dao.connect()
        let usuarios = await this.dao.db("mudle").collection("usuarios");
        return await usuarios.findOne({mail: userMail});
    }
    
    async insertarUsuario(usuario){
        let usuarios = await this.dao.db("mudle").collection("usuarios");
        return await usuarios.insertOne(usuario)    
    }

    async actualizarUsuario(idUsuario,usuario){
        let usuarios = await this.dao.db("mudle").collection("usuarios");
        const filter = { _id: new ObjectId(idUsuario) };
        const update ={ $set: usuario};
    
        return await usuarios.updateOne(filter, update);
    }
}

module.exports = RepositorioUsuario;