module.exports = class Item{
    constructor(titulo, contenido) {
        this.parentNode = -1;
        this.titulo = titulo;
        this.contenido = contenido??"";
        this.permiso = "";
        this.duenio="";
    }
}