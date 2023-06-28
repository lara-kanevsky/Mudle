const express = require("express");
const jsonwebtoken = require("jsonwebtoken");

const ServicioAutenticacion = require("../Servicios/ServicioAutenticacion");
const ServicioUsuario = require("../Servicios/ServicioUsuario");
const config = require('../config')

const rutaAutenticacion = express.Router();

rutaAutenticacion.post('/registrarse',async (req, res) => {
    let result = await new ServicioUsuario().nuevoUsuario(req.body);
    res.send(result);
});

rutaAutenticacion.post('/login',async function(request, response){
    var mail = request.body.mail;
    var password = request.body.password;
    if(!mail || !password) {
        response.status(400).send("Bad request");
    } else {
      let userFound = await new ServicioAutenticacion().userCredentialsAreValid(mail, password);
        if(userFound) {
            var claim = {
                id: userFound._id,
                tipoUsuario: userFound.tipoUsuario,
            }
            var token = jsonwebtoken.sign(claim, config.jwtSecret, {
                expiresIn: config.jwtExpiresInSec
            });
            response.send("JWT: " + token);
        } else {
            return response.status(401).end("Mail o contraseña incorrectos");
        }
    }
  });

module.exports = rutaAutenticacion;