// Persistencia de modelos u objetos de dominio/negocio

const ArrayDao = requiere('./array_dao_js')

class Repository {
    constructor(almacen = new ArrayDao){
        this.almacen = almacen
    }
    crear() {
        this.almacen.guardar(elemento)
    }
    borrar(){
        this.almacen.quitar(identificador)
    }
    actualizar(identificador,actualizacion = {}){
        this.almacen.cambiar(identificador)
    }

    obtener(identificador = null){
        return this.almacen.buscar(identificador)
    }
}

const repo = new Repository
const repo2 = new Repository(new MySqlDao)

const objetoNuevo = {
    identificador: 1,
    nombre: "Ejemplo"
}

repo.crear(objetoNuevo)