const express = require("express");
const ServicioEvento = require("../Servicios/ServicioEvento");

const rutaEventos = express.Router();

rutaEventos.post('/', async (req, res) => {
    try {
      let userId = req.decodedToken.id;
      const evento = await new ServicioEvento().crearNuevoEvento(req.body, userId);
      res.status(200).json(evento);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred.', message: error.message });
    }
  });
  

rutaEventos.put('/:eventoId', async (req, res) => {
  try {
    let userId = req.decodedToken.id;
    const eventoId = req.params.eventoId;
    res.send(await new ServicioEvento().actualizarEvento(eventoId, userId, req.body));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

rutaEventos.get('/', async (req, res) => {
  try {
    let userId = req.decodedToken.id;
    res.send(await new ServicioEvento().getUsuarioEventos(userId));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = rutaEventos;
