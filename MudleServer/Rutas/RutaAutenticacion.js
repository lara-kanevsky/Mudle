const express = require("express");

const ServicioAutenticacion = require("../Servicios/ServicioAutenticacion");
const ServicioUsuario = require("../Servicios/ServicioUsuario");

const rutaAutenticacion = express.Router();

rutaAutenticacion.post('/registrarse',async (req, res) => {
    let result = await new ServicioUsuario().nuevoUsuario(req.body);
    res.send(result);
});

const servicioAutenticacion = new ServicioAutenticacion();

rutaAutenticacion.post('/login', async function (request, response) {
  try {
    const { mail, password } = request.body;

    const responseObject = await servicioAutenticacion.loginUser(mail, password);
    response.json(responseObject);
  } catch (error) {
    if (error.message === "Bad request" || error.message === "Mail o contraseña incorrectos") {
      response.status(401).json({ error: error.message });
    } else {
      response.status(500).json({ error: "Internal server error" });
    }
  }
});

module.exports = rutaAutenticacion;