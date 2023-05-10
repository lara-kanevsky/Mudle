const Server = require("./Server");

class Usuario{
    constructor(nombre,mail,password){
        this.nombre=nombre
        this.mail=mail
        this.password=password
    }
}

module.exports = Usuario;

new Server().consolelogear()