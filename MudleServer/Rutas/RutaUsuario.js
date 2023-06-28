const express = require("express");

const ServicioUsuario = require("../Servicios/ServicioUsuario");


const rutaUsuarios = express.Router();

rutaUsuarios.post('/moodleCredentials',async (req, res) => {
    let userId = req.decodedToken.id;

    let username = req.body.username;
  
    let password = req.body.password;

    let credencialesMoodle =  {username:username,password:password};
    res.send(await new ServicioUsuario().agregarCredencialesMoodle(userId,credencialesMoodle));
  })

module.exports = rutaUsuarios;
