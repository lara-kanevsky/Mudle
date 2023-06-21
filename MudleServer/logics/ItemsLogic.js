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
        return isValid;
    }

    getInstance(inputObj){
        return Utils.getObjectInstance(new Item(),inputObj)
    }

    async getUserItems(idUser){
        let user = await new UsuariosLogic().getUser(idUser);
        if (user.isLeft()){
            return user;
        }
        let userItems = user.getRight().items;
        console.log("USER ITEMS = ",userItems)
        let getUserItemsResponse = await this.DAO.read(userItems.map(item=>item._id))
        console.log("getUserItemsResponse",getUserItemsResponse)
        return Either.right(new ServerResponse(200,[],getUserItemsResponse.getRight().content))
    }

    async insertNewItem(idUsuario,userInput,permisoItem){
        userInput.duenio = idUsuario;

        let insertItemResponse = await this.DAO.insert(userInput);

        if(insertItemResponse.isLeft()){
            return insertItemResponse.getLeft();
        }

        let addItemToUserResponse = new UsuariosLogic().addItemToUser(idUsuario,insertItemResponse.getRight().content.insertedId,permisoItem);
        return Either.right(new ServerResponse(201,[],addItemToUserResponse));
    }

    async compartirItemCon(idItem,tipoPermiso,mail){
        const usuariosLogic = new UsuariosLogic();
            let userId = await usuariosLogic.getUserByMail(mail);
        if(userId.isLeft()){
     return userId;
    }
            usuariosLogic.addItemToUser(userId.getRight()._id,idItem,tipoPermiso)
        return Either.right("Compartido con : "+ mail)
    }

    async compartirItemConMuchos(idItem,tipoPermiso,mails){
        let response = [];
        for (let index = 0; index < mails.length; index++) {
            const element = mails[index];
            response.push(await this.compartirItemCon(idItem,tipoPermiso,element));
        }
return response;
    }
}
module.exports = ItemsLogic