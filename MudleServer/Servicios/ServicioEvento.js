const RepositorioEvento = require('../Repositorio/RepositorioEvento.js');
const ServicioItem = require('./ServicioItem.js');
const ServicioUsuario = require('./ServicioUsuario.js');

class ServicioEvento {
  constructor() {
    this.repositorio = new RepositorioEvento();
  }

  async getEventoById(id) {
    return await this.repositorio.getEventoById(id);
  }

  async crearNuevoEvento(eventoInfo,userId) {
    let servicioUsuario = new ServicioUsuario();
    let usuario = await servicioUsuario.getUsuarioById(userId)
    let evento = await this.repositorio.insertarEvento(eventoInfo);
    let eventoId = evento.insertedId.toString();
    evento.items = [];
    await servicioUsuario.addEventoToUser(eventoId,usuario.mail)
    return evento;
  }

  async agregarItemAEvento(idEvento, idItem, idUser) {
      let servicioUsuario = new ServicioUsuario();
      let usuario = await servicioUsuario.getUsuarioById(idUser);
      if(usuario.eventos.includes(idEvento)){
        let evento = await this.getEventoById(idEvento);
        console.log(evento)
        evento.items.push(idItem);
        return this.repositorio.actualizarEvento(idEvento,evento);
      }
      else{
        throw new Error("El usuario no posee el evento.")
      }
  }

  async getItemsEvento(idEvento,idUser) {
    let servicioUsuario = new ServicioUsuario();
    let usuario = await servicioUsuario.getUsuarioById(idUser);
    if(usuario.eventos.includes(idEvento)){
      let evento = await this.getEventoById(idEvento);
      let servicioItem = new ServicioItem();
      return servicioItem.getItems(evento.items);
    }
    else{
      throw new Error("El usuario no posee el evento.")
    }
  }
}

module.exports = ServicioEvento;