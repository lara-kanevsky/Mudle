const express = require("express");

const ServicioItem = require("../Servicios/ServicioItem");

const rutaItems = express.Router();

rutaItems.post('/',async (req, res) => {
  try{
    let userId = req.decodedToken.id;
    res.send(await new ServicioItem().nuevoItem(req.body,userId));
  }catch(error){
    res.status(500).send(error)
  }
});

rutaItems.get('/',async (req, res) => {
  try{
    let userId = req.decodedToken.id;
    res.send(await new ServicioItem().getUserItems(userId));
  }catch(error){
    res.status(500).send(error)
  }
  })

rutaItems.post('/compartir',async (req, res) => {
  try{
    const idItem = req.body.idItem;
    const tipoPermiso = req.body.tipoPermiso;
    const arrayMailsUsuarios = req.body.arrayMailsUsuarios;

    res.send(await new ServicioItem().compartirItemConMuchos(idItem,arrayMailsUsuarios,tipoPermiso));
  }catch(error){
    res.status(500).send(error)
  }
  })

module.exports = rutaItems;