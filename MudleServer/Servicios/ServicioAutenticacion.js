const ServicioUsuario = require('./ServicioUsuario');
const jsonwebtoken = require("jsonwebtoken");
const config = require('../config')

class ServicioAutenticacion{
    async userCredentialsAreValid(email,password){
        let usuario =  await new ServicioUsuario().getUserByEmail(email,password);
        return usuario!=null && usuario.password == password ? usuario : null;
    }

    async loginUser(mail, password) {
        if (!mail || !password) {
          throw new Error("Bad request");
        }
        const userFound = await this.userCredentialsAreValid(mail, password);
    
        if (userFound) {
          const claim = {
            id: userFound._id,
            tipoUsuario: userFound.tipoUsuario,
            username: userFound.username,
          };
    
          const token = jsonwebtoken.sign(claim, config.jwtSecret, {
            expiresIn: config.jwtExpiresInSec,
          });
    
          const servicioUsuario = new ServicioUsuario();
          const eventosProximos = await servicioUsuario.buscarEventosProximos(claim.id);
    
          const responseObject = {
            token: token,
            eventosProximos: eventosProximos,
          };
    
          return responseObject;
        } else {
          throw new Error("Mail o contraseña incorrectos");
        }
      }
}

module.exports = ServicioAutenticacion;