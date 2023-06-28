const express = require("express");

const ServicioItem = require("../Servicios/ServicioItem");

const rutaItems = express.Router();

rutaItems.post('/',async (req, res) => {
    res.send(await new ServicioItem().nuevoItem(req.body));
});

rutaItems.get('/',async (req, res) => {
    let userId = req.decodedToken.id;
    res.send(await new ServicioItem().getUserItems(userId));
  })

rutaItems.post('/compartir',async (req, res) => {
    const idItem = req.body.idItem;
    const tipoPermiso = req.body.tipoPermiso;
    const arrayMailsUsuarios = req.body.arrayMailsUsuarios;

    res.send(await new ServicioItem().compartirItemConMuchos(idItem,arrayMailsUsuarios,tipoPermiso));
  })

module.exports = rutaItems;