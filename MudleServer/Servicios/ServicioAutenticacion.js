const ServicioUsuario = require('./ServicioUsuario');

class ServicioAutenticacion{
    async userCredentialsAreValid(email,password){
        let usuario =  await new ServicioUsuario().getUserByEmail(email,password);
        return usuario!=null && usuario.password == password ? usuario : null;
    }
}

module.exports = ServicioAutenticacion;