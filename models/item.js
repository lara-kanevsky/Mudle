module.exports = class Item{
    constructor(titulo, contenido,permiso) {
        this.parentNode = -1;
        this.titulo = titulo;
        this.contenido = contenido??"";
        this.permiso = permiso;
    }
}