module.exports = class ArrayDao{
        constructor(){
            this.coleccion = []
        }
        guardar() {
            this.coleccion.push(elemento)
        }
        quitar(){
            this.coleccion = this.coleccion.filter((elemento) => {
                return elemento.identificador != identificador
            })
        }
        actualizar(identificador,actualizacion = {}){
            let objeto = this.coleccion.find(elemento => elemento.identificador == identificador)
            
            objeto = {...objeto, ...actualizacion}

            this.coleccion = this.coleccion.map(elemento =>{
                if(elemento.identificador == objeto.identificador){
                    return objeto
                } else {
                    return elemento
                }
            })
        }

        obtener(identificador = null){
            if(!identificador === null){
                return this.coleccion
            }
            return this.coleccion.find(elemento => elemento.identificador == identificador)
        }
}
