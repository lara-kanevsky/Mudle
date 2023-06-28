const express = require("express");
const http = require('http');

const ServicioUsuario = require("../Servicios/ServicioUsuario");
const ServicioImportar = require("../Servicios/ServicioImportar");

const rutaImportacion = express.Router();
rutaImportacion.post('/',async (request, response) => {
  try{
    let idUsuario = request.decodedToken.id;
    let servicioUsuario = new ServicioUsuario();
    let usuario = await servicioUsuario.getUsuarioById(idUsuario)
    let tieneCredencialesMoodle = await servicioUsuario.tieneCredencialesMoodle(idUsuario);

  //Mandar un response no hace que pare la ejecucion de la funcion. Por eso el if else.
if(tieneCredencialesMoodle){
    //No tocar porque esta asi raro pero no pude hacerlo de otra forma en su momento. Pero anda.
    const postData = JSON.stringify({
        username:usuario.moodleCredentials.username,
        password:usuario.moodleCredentials.password
      });
      
      const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/items',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
        const req = http.request(options, (res) => {
          let respuesta = '';
        
          res.on('data', (chunk) => {
            respuesta += chunk;
          });
        
          res.on('end',async () => {
            let items = await new ServicioImportar().parseAPIItems(JSON.parse(respuesta),idUsuario);
            for (let index = 0; index < items.length; index++) {
              const element = items[index];
              await servicioUsuario.addItemToUser(element._id,usuario.mail,"duenio")
            }
            response.send(items);
          });
        });
        
        req.on('error', (error) => {
          console.error(`Request error: ${error}`);
        });
        
        req.write(postData);
        req.end();
}else{
    response.send("No tiene credenciales de Moodle cargadas en su usuario. Puede cargarlas e intentar de nuevo.")
  }
  }catch(error){
    res.status(500).send(error)
  }
  })

  module.exports = rutaImportacion;