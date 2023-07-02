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

rutaAutenticacion.post('/login', async function (request, response) {
    try {
      const { mail, password } = request.body;
  
      if (!mail || !password) {
        return response.status(400).json({ error: "Bad request" });
      }
  
      const userFound = await new ServicioAutenticacion().userCredentialsAreValid(mail, password);
  
      if (userFound) {
        const claim = {
          id: userFound._id,
          tipoUsuario: userFound.tipoUsuario,
          username: userFound.username,
        };
  
        const token = jsonwebtoken.sign(claim, config.jwtSecret, {
          expiresIn: config.jwtExpiresInSec
        });
   
        const servicioUsuario = await new ServicioUsuario();
        const eventosProximos = await servicioUsuario.buscarEventosProximos(claim.id);

        const responseObject = {
          token: token,
          eventosProximos: eventosProximos
        };

        response.json(responseObject);
      } else {
        return response.status(401).json({ error: "Mail o contraseña incorrectos" });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  });

module.exports = rutaAutenticacion;