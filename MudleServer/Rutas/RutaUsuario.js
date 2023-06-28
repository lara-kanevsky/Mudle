const express = require("express");

const ServicioUsuario = require("../Servicios/ServicioUsuario");


const rutaUsuarios = express.Router();

rutaUsuarios.post('/moodleCredentials',async (req, res) => {
  try{
    let userId = req.decodedToken.id;

    let username = req.body.username;
  
    let password = req.body.password;

    let credencialesMoodle =  {username:username,password:password};
    res.send(await new ServicioUsuario().agregarCredencialesMoodle(userId,credencialesMoodle));
  }catch(error){
    res.status(500).send(error)
  }
  })

module.exports = rutaUsuarios;
