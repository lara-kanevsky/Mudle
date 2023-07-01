const RepositorioEvento = require('../Repositorio/RepositorioEvento.js');

class ServicioEvento {
  constructor() {
    this.repositorio = new RepositorioEvento();
  }

  async getEventoById(id) {
    return await this.repositorio.getEventoById(id);
  }

  async crearNuevoEvento(eventoInfo,userId) {
    let servicioUsuario = await new ServicioUsuario();
    let usuario = await servicioUsuario.getUsuarioById(userId)
    let evento = await this.repositorio.insertarEvento(eventoInfo);
    let eventoId = evento.insertedId.toString();
    await servicioUsuario.addEventoToUser(eventoId,usuario.mail)
    return evento;
  }

  async actualizarEvento(idEvento, eventoActualizado) {
    return await this.repositorio.actualizarEvento(idEvento, eventoActualizado);
  }

  async eliminarEvento(idEvento) {
    return await this.repositorio.eliminarEvento(idEvento);
  }
}

module.exports = ServicioEvento;