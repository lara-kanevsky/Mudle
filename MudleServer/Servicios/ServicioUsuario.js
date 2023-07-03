const RepositorioUsuario = require('../Repositorio/RepositorioUsuario.js');

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
        usuario.eventos = [];
        return await this.repositorio.insertarUsuario(usuario);
    }

    async agregarCredencialesMoodle(idUsuario,credencialesMoodle){
        let usuario = this.repositorio.getUserById(idUsuario);
        usuario.moodleCredentials = credencialesMoodle;
        return this.repositorio.actualizarUsuario(idUsuario,usuario)
    }

    async addItemToUser(idItem,mail,tipoPermiso){
        let usuario = await this.getUserByEmail(mail);
        let item = {_id:idItem,permiso:tipoPermiso};
        usuario.items.push(item);
        return this.repositorio.actualizarUsuario(usuario._id,usuario);
    }

    async addEventoToUser(eventoId,mail){
        let usuario = await this.getUserByEmail(mail);
        let evento = {_id:eventoId,leido:false}
        usuario.eventos.push(evento);
        return this.repositorio.actualizarUsuario(usuario._id,usuario);
    }

    async removeItemFromUser(idUser, idItem) {
        let usuario = await this.getUsuarioById(idUser);
        const indexItem = usuario.items.findIndex(item => item._id == idItem);
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

    async buscarEventosProximos(idUsuario){
        const ServicioEvento = require('./ServicioEvento.js');
        let usuario = await this.getUsuarioById(idUsuario);
        const servicioEvento = new ServicioEvento();

        let eventosProximos = [];

        for (let eventoId of usuario.eventos) {
            const eventoResponse = await servicioEvento.getEventoById(eventoId._id);
            let evento = servicioEvento.parseEvento(eventoResponse);
            evento.leido = eventoId.leido;
            if (evento.deberiaNotificar()) {
                let eventoFound = usuario.eventos.find(idEvento =>idEvento._id ==eventoId._id)
                eventoFound.leido = true;
                eventosProximos.push(evento);
            }
        }
        this.repositorio.actualizarUsuario(idUsuario,usuario)
        return eventosProximos;
    }
}

module.exports = ServicioUsuario;