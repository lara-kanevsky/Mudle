const express = require("express");
const ServicioEvento = require("../Servicios/ServicioEvento");

const rutaEventos = express.Router();

rutaEventos.post('/', async (req, res) => {
    try {
      let userId = req.decodedToken.id;
      const evento = await new ServicioEvento().crearNuevoEvento(req.body, userId);
      res.status(200).json(evento);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error', message: error.message });
    }
  });
  

  rutaEventos.put('/:eventoId/:itemId', async (req, res) => {
    try {
      let userId = req.decodedToken.id;
      const eventoId = req.params.eventoId;
      const itemId = req.params.itemId;
      const updatedEvento = await new ServicioEvento().agregarItemAEvento(eventoId, itemId, userId);
      res.json(updatedEvento);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error', message: error.message });
    }
  });  

rutaEventos.get('/:eventoId', async (req, res) => {
  try {
    let userId = req.decodedToken.id;
    const eventoId = req.params.eventoId;
    const eventosObtenidos = await new ServicioEvento().getItemsEvento(eventoId,userId)
    res.json(eventosObtenidos);
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error', message: error.message });
  }
});

module.exports = rutaEventos;
