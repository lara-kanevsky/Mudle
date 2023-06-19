const Utils = require('../models/Utils')
const MongoDBDAO = require('../DAOs/MongoDBDAO');
const Usuario = require('../models/Usuario');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')


class UsuariosLogic{
    constructor(){
        this.DAO = new MongoDBDAO("usuarios",this.isValidInsert);
    }

    isValidInsert(inputUser){
        let isValid = Utils.basicValidator(new Usuario(),inputUser);
        //TODO: Checkear email existente
        return isValid;
    }
}

module.exports = UsuariosLogic