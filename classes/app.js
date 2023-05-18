const Usuario = require("./usuario.js")
const Evento = require('./evento.js')
const Item = require('./item.js')

class App {
    constructor(){
        this.usuarios = []
        this.eventos = []
        this.items = []
    }
<<<<<<< HEAD
=======

    insertarItem(usuario,item){
        usuario.agregarItem(item)
    }

    insertUser() {

    }

    insertEvent(){

    }
>>>>>>> 8bc9a2cf5d5ce78c566008c9267f5fc2c8656879
}

module.exports = App;