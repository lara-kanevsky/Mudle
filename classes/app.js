const Usuario = require("./usuario.js")
const Evento = require('./evento.js')
const Item = require('./item.js')

class App {
    constructor(){
        this.usuarios = []
        this.eventos = []
        this.items = []
    }

    insertarItem(usuario,item){
        usuario.agregarItem(item)
    }

    insertUser() {

    }

    insertEvent(){

    }
}

module.exports = App;