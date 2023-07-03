module.exports = class Evento{
    constructor(titulo, fecha,diasAntes) {
        this.titulo = titulo;
        this.fecha = fecha;
        this.items = [];
        this.avisarConAnticipacion = diasAntes;
        this.leido = false;
    }

    isValidEventDate(){
        return this.getCountDown()<0;
    }

    isValidAnticipacion(){
        return this.avisarConAnticipacion >0;
    }

    getCountDown(){
        return new Date - new Date(this.fecha)
    }

    isExpired(){
        return this.getCountDown()>0;
    }

    deberiaNotificar(){
        const now = new Date();
        const cuandoNotificar = new Date(now);
        cuandoNotificar.setDate(new Date(this.fecha).getDate()-parseInt(this.avisarConAnticipacion))

        return !this.isExpired() && !this.leido && cuandoNotificar<new Date()
    }
}