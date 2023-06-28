const RepositorioItem = require('../Repositorio/RepositorioItem.js');
const ServicioUsuario = require('./ServicioUsuario.js');

class ServicioItem{
    constructor(){
        this.repositorio = new RepositorioItem();
    }

    async nuevoItem(itemInfo,userId){
        //Validacion
        let servicioUsuario = await new ServicioUsuario();
        let usuario = await servicioUsuario.getUsuarioById(userId)
        let item = await this.repositorio.insertarItem(itemInfo);
        let itemId = item.insertedId.toString();
        await servicioUsuario.addItemToUser(itemId,usuario.mail,"read/write")
        return item;
    }

    async modificarItem(itemId,userId,itemNuevo){
        let servicioUsuario = await new ServicioUsuario();
        let usuario = await servicioUsuario.getUsuarioById(userId);
        let permisosUsuario = usuario.items.find(item => item._id.toString() === itemId);
        if(permisosUsuario.permiso === 'read/write'){
            return await this.repositorio.actualizarItem(itemId,itemNuevo);
        }
        else{
            throw new Error('Permisos insuficientes');
        }
    }

    async getItemById(itemId){
        return await this.repositorio.getItemFromId(itemId);
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