const Utils = require('../models/Utils')
const MongoDBDAO = require('../DAOs/MongoDBDAO');
const Item = require('../models/Item');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')
const UsuariosLogic = require('./UsuariosLogic')
const ServerResponse = require('../models/ServerResponse.js')
class ItemsLogic{
    constructor(){
        this.DAO = new MongoDBDAO("items",this.isValidInsert,this.getInstance);
    }
    isValidInsert(inputItem){
        let necessaryKeys = ["titulo","contenido","duenio"];
        let isValid = Utils.basicValidator(new Item(),inputItem,necessaryKeys);
        //TODO: Checkear email existente
        return isValid;
    }
    getInstance(inputObj){
        return Utils.getObjectInstance(new Item(),inputObj)
    }
    async getUserItems(idUser){
        console.log(idUser)
        let getUserResult = await new UsuariosLogic().DAO.read(idUser)
        console.log("getUserItems getUserResult",getUserResult.getRight())
        if(getUserResult.isLeft()){
            return Either.left(["User not found."])
        }
        let userItems = getUserResult.getRight().content[0].items;
        console.log("USER ITEMS = ",userItems)
        let getUserItemsResponse = await this.DAO.read(userItems.map(item=>item._id))
        console.log("getUserItemsResponse",getUserItemsResponse)
        return Either.right(new ServerResponse(200,[],getUserItemsResponse.getRight().content))
    }
    async insertNewItem(idUsuario,userInput){
        console.log("inserting new item")
        userInput.duenio = idUsuario;
        let insertItemResponse = await this.DAO.insert(userInput);
        if(insertItemResponse.isRight()){
            console.log(insertItemResponse)
            let addItemToUserResponse = new UsuariosLogic().addItemToUser(idUsuario,insertItemResponse.getRight().content.insertedId);
        }
    }
}
module.exports = ItemsLogic