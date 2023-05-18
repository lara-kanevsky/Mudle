class Evento{
    constructor(fecha,descripcion){
        setFecha(fecha);
        this.descripcion=descripcion??"Sim descripcion";
    }
    setFecha(fecha){
        if(Object.prototype.toString.call(fecha) !== '[object Date]')
            throw new Error('La fecha no es un Date valido.');
        this.fecha=fecha;
    }
}

module.exports = Evento;