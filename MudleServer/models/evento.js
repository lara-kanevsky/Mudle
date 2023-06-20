class Evento{
    constructor(titulo, descripcion, fecha) {
        this._titulo = titulo;
        this._descripcion = descripcion;
        this._fecha = fecha;
    }

    getTitulo() {
        return this._titulo;
    }

    setTitulo(nuevoTitulo) {
        this._titulo = nuevoTitulo;
    }

    getDescripcion() {
        return this._descripcion;
    }

    setDescripcion(nuevaDescripcion) {
        this._descripcion = nuevaDescripcion;
    }

    getFecha() {
        return this._fecha;
    }

    setFecha(nuevaFecha) {
        this._fecha = nuevaFecha;
    }
}

module.exports = Evento;