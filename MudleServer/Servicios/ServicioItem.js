const RepositorioItem = require('../Repositorio/RepositorioItem.js');
const ServicioUsuario = require('./ServicioUsuario.js');

class ServicioItem{
    constructor(){
        this.repositorio = new RepositorioItem();
    }

    async nuevoItem(item){
        //Validacion
        return await this.repositorio.insertarItem(item);
    }
    
    async getUserItems(idUser){
        let userItemsId = await new ServicioUsuario().getUsuarioItemsId(idUser)
        let itemsIds = userItemsId.map(item=>item._id);

        return await this.repositorio.getItemsFromIds(itemsIds);
    }

    async compartirItemConMuchos(idItem,mails,tipoPermiso){
        let servicioUsuario = new ServicioUsuario();
        let response = [];
        for (let index = 0; index < mails.length; index++) {
            response.push(await servicioUsuario.addItemToUser(idItem,mails[index],tipoPermiso));
        }
        return response;
    }
}

module.exports = ServicioItem;