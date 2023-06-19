const UsuariosLogic = require('./UsuariosLogic');
const MongoDBDAO = require('./UsuariosLogic');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')
class AuthenticationLogic{
    static async userCredentialsAreValid(email,password){
        let userFoundResponse = await new UsuariosLogic().DAO.read({mail:email,password:password})
        console.log("userFound",userFoundResponse)

        if(userFoundResponse.isRight()){
            let content = userFoundResponse.getRight().content;
            let user = content.length == 1 ? content[0] : null;
            return content.length == 1 ? Either.right(content[0]) : Either.left();
        }

        return Either.left();
    }
}
module.exports = AuthenticationLogic