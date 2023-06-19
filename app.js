const express = require('express')
const Either = require('./models/Either')
const Left = require('./models/Left')
const Right = require('./models/Right')
const UsuariosLogic = require('./logics/UsuariosLogic')
const ItemsLogic = require('./logics/ItemsLogic')
const Utils = require('./models/Utils')
const MongoDBDAO = require('./DAOs/MongoDBDAO')
const app = express()
const port = 3000

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

// app.get('/usuarios',async (req, res) => {
//   console.log(req.query)
//   let result =await new UsuariosLogic().DAO.read(req.query);
//   res.send(result)
// })

app.post('/usuarios',async (req, res) => {
  let result = await new UsuariosLogic().DAO.insert(req.body);
  let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  res.send(serverResponse.status,serverResponse.translateToUser());
})

app.post('/items',async (req, res) => {
  console.log(req.body)
  let result = await new ItemsLogic().DAO.insert(req.body);
  let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  res.send(serverResponse.status,serverResponse.translateToUser());
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

