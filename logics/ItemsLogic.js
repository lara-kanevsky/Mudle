const Utils = require('../models/Utils')
const MongoDBDAO = require('../DAOs/MongoDBDAO');
const Item = require('../models/Item');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')
class ItemsLogic{
    constructor(){
        this.DAO = new MongoDBDAO("items",this.isValidInsert);
    }
    isValidInsert(inputItem){
        let isValid = Utils.basicValidator(new Item(),inputItem);
        //TODO: Checkear email existente
        return isValid;
    }
}
module.exports = ItemsLogic