const Utils = require('../models/Utils')
const MongoDBDAO = require('../DAOs/MongoDBDAO');
const Usuario = require('../models/Usuario');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')


class UsuariosLogic{
    constructor(){
        this.DAO = new MongoDBDAO("usuarios",this.isValidInsert,this.getInstance);
    }

    async isValidInsert(inputUser,DAO){
        let necessaryKeys = ["mail","password"]
        let isValid = Utils.basicValidator(new Usuario(),inputUser,necessaryKeys);
        console.log("isValid",isValid)
        //console.log("DAO",DAO)
        let mailFoundResponse = await DAO.read({mail:inputUser.mail});
        console.log("mailFoundResponse",mailFoundResponse.getRight().content)
        let mailWasNotFound = (mailFoundResponse.isRight()&& mailFoundResponse.getRight().content.length==0)?Either.right():Either.left(["Mail already in use."]);
        console.log("mailWasFound",mailWasNotFound);
        let result = Utils.getRightResultsOrALeft([isValid,mailWasNotFound])
        console.log("fused",result)

            return result;

    }
    getInstance(inputObj){
        return Utils.getObjectInstance(new Usuario(),inputObj)
    }
    async addItemToUser(idUsuario,idItem,permisoItem){
        let addItemResponse = await this.DAO.update(idUsuario,null,{ $addToSet: { items: {_id:idItem,permiso:"duenio"}} });
        console.log("addItemResponse",addItemResponse)
        if(addItemResponse.isLeft()){
            return addItemResponse;
        }
        return addItemResponse.getRight();
    }

    async getUser(idUser){
        let getUserResult = await new UsuariosLogic().DAO.read(idUser)

        if(getUserResult.isLeft()){
            return Either.left(["User not found."])
        }
        return Either.right(getUserResult.getRight().content[0])
    }
    
    async getUserByMail(userMail){
        let getUserResult = await new UsuariosLogic().DAO.read({mail: userMail})
        console.log(getUserResult)
        if(getUserResult.isLeft()){
            return Either.left(["User not found."])
        }
        return Either.right(getUserResult.getRight().content[0])
    }
}

module.exports = UsuariosLogic