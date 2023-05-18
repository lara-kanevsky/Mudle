class Evento{
<<<<<<< HEAD
    constructor(fecha,descripcion){
        setFecha(fecha);
        this.descripcion=descripcion??"Sim descripcion";
        this.aviso=true;
    }
    setFecha(fecha){
        if(Object.prototype.toString.call(fecha) !== '[object Date]')
            throw new Error('La fecha no es un Date valido.');
        this.fecha=fecha;
=======
    constructor(titulo,fecha,descripcion){
        titulo:""
        fecha:""
        descripcion:""
        aviso:true;
>>>>>>> 8bc9a2cf5d5ce78c566008c9267f5fc2c8656879
    }
}

module.exports = Evento;