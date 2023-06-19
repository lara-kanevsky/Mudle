const Either = require('./Either')
const Left = require('./Left.js')
const Right = require('./Right.js')
const PermisoWrite = require('./PermisoWrite.js')
const PermisoRead = require('./PermisoRead.js')

class PermisoGenerator {
    constructor() {

    }
    static getPermiso(permisoString) {
        switch (permisoString) {
            case 'read':
                return Either.right(new PermisoRead())
            case 'write':
                return Either.right(new PermisoWrite())
            default:
                return Either.left("Problema con el permiso.")
        }
    }
}
module.exports = PermisoGenerator
//BORRAR