const MongoDBDAO = require('./DAOs/MongoDBDAO');

module.exports=class Repository{
    constructor(collectionName){
        this.collectionName = collectionName;
        this.collection = [];

        this.dao = new MongoDBDAO;
    }
    insert(){
        //No validar objeto aca, se deberia trabajar con objetos validos solamente

    }
    update() {
        
    }
    delete(){

    }
    read(){
        //Separar rutas, si se pasa una funcion entonces es una para filtrar. Si se pasa un id es para traer uno. Si no se pasa nada es para traer todo. (funciones separadas!!)
    }
}