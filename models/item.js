module.exports = class Item{
    constructor(titulo,contenido){
        this.parentNode=null;
        this.titulo=titulo;
        this.contenido=contenido;
    }

    setParentNode(parentNode) {
        this.parentNode = parentNode;
    }
    
    getParentNode() {
        return this.parentNode;
    }

    getTitulo() {
        return this.titulo;
    }
    
    setTitulo(titulo) {
        this.titulo = titulo;
    }
    
    getContenido() {
        return this.contenido;
    }
    
    setContenido(contenido) {
        this.contenido= contenido;
    }
}