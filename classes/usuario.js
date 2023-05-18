const Server = require("./Server");

class Usuario{
    constructor(nombre,mail,password){
        this.nombre=nombre
        this.mail=mail
        this.password=password
        this.eventos=[]
        this.items=[]
    }

    agregarItem(item){
        if(item != null){
            this.items.push(item)
        }
    }

}

module.exports = Usuario;

new Server().consolelogear()