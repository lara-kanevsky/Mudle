const RepositorioEvento = require('../Repositorio/RepositorioEvento.js');
const ServicioItem = require('./ServicioItem.js');
const ServicioUsuario = require('./ServicioUsuario.js');
const Evento = require('../models/Evento.js');

class ServicioEvento {
  constructor() {
    this.repositorio = new RepositorioEvento();
  }

  async getEventoById(id) {
    return await this.repositorio.getEventoById(id);
  }

  async crearNuevoEvento(eventoInfo,userId) {
    let evento = new Evento(eventoInfo.titulo,eventoInfo.fecha,eventoInfo.avisarConAnticipacion);
    if(!evento.isValidEventDate() || !evento.isValidAnticipacion()){
      return "Event is invalid";
    }
    let servicioUsuario = new ServicioUsuario();
    let usuario = await servicioUsuario.getUsuarioById(userId)
    eventoInfo.items = [];
    let eventoResponse = await this.repositorio.insertarEvento(eventoInfo);
    let eventoId = eventoResponse.insertedId.toString();
    await servicioUsuario.addEventoToUser(eventoId,usuario.mail)
    return eventoResponse;
  }

  async agregarItemAEvento(idEvento, idItem, idUser) {
      let servicioUsuario = new ServicioUsuario();
      let usuario = await servicioUsuario.getUsuarioById(idUser);
      if(usuario.eventos.some(eId=>eId._id==idEvento)){
        let evento = await this.getEventoById(idEvento);
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
    if(usuario.eventos.some(eId=>eId._id==idEvento)){
      let evento = await this.getEventoById(idEvento);
      let servicioItem = new ServicioItem();
      return servicioItem.getItems(evento.items);
    }
    else{
      throw new Error("El usuario no posee el evento.")
    }
  }


  
 parseEvento(eventoRaw){
  let evento = new Evento(eventoRaw.titulo,eventoRaw.fecha,eventoRaw.avisarConAnticipacion);
  evento.items = evento.items;
  evento.leido = evento.leido;
  return evento;
  }
}

module.exports = ServicioEvento;