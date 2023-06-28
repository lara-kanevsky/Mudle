const RepositorioUsuario = require('../Repositorio/RepositorioUsuario.js')

class ServicioUsuario{
    constructor(){
        this.repositorio = new RepositorioUsuario();
    }

    async usuarioTieneItem(userId,itemId) {
        return await this.repositorio.getUser(userId);
    }

    async getUsuarioById(id) {
        return await this.repositorio.getUserById(id);
    }

    async getUserByEmail(mail) {
        return await this.repositorio.getUserByEmail(mail);
    }

    async nuevoUsuario(usuario){
        usuario.items = [];
        return await this.repositorio.insertarUsuario(usuario);
    }

    async agregarCredencialesMoodle(idUsuario,credencialesMoodle){
        let usuario = this.repositorio.getUserById(idUsuario);
        usuario.moodleCredentials = credencialesMoodle;
        return this.repositorio.actualizarUsuario(idUsuario,usuario)
    }

    async addItemToUser(idItem,mail,tipoPermiso){
        //Validar que no tiene el item ya
        let usuario = await this.getUserByEmail(mail);
        let item = {_id:idItem,permiso:tipoPermiso};
        usuario.items.push(item);
        return this.repositorio.actualizarUsuario(usuario._id,usuario);
    }

    async removeItemFromUser(idUser, idItem) {
        let usuario = await this.getUsuarioById(idUser);
        const indexItem = usuario.items.findIndex(item => item._id == idItem);
        console.log(indexItem)
        if (indexItem !== -1) {
          usuario.items.splice(indexItem, 1);
          return this.repositorio.actualizarUsuario(idUser, usuario);
        } else{
          throw new Error('Item no encontrado');
        }
      }
      

    async getUsuarioItemsId(idUsuario){
        let usuario = await this.getUsuarioById(idUsuario);
        return usuario.items;
    }

    async tieneCredencialesMoodle(idUsuario){
        let usuario = await this.getUsuarioById(idUsuario);
        return usuario.moodleCredentials!=null;
    }
}

module.exports = ServicioUsuario;