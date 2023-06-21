const express = require('express')


const config = require('./config')
const Either = require('./models/Either')
const Left = require('./models/Left')
const Right = require('./models/Right')
const UsuariosLogic = require('./logics/UsuariosLogic')
const AuthenticationLogic = require('./logics/AuthenticationLogic')
const ImportarLogic = require('./logics/ImportarLogic')
const ItemsLogic = require('./logics/ItemsLogic')
var jsonwebtoken = require("jsonwebtoken");
const Utils = require('./models/Utils')
const MongoDBDAO = require('./DAOs/MongoDBDAO')
const app = express();
const port = config.serverPort;

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

// app.get('/usuarios',async (req, res) => {
//   console.log(req.query)
//   let result =await new UsuariosLogic().DAO.read(req.query);
//   res.send(result)
// })

app.post('/login',async function(request, response){
  var mail = request.body.mail;
  var password = request.body.password;
  if(!mail || !password) {
      response.status(400).send("Bad request");
  } else {
    let userFound = await AuthenticationLogic.userCredentialsAreValid(mail, password);
      if(userFound.isRight()) {
          var claim = {
              id: userFound.getRight()._id,
              tipoUsuario: userFound.getRight().tipoUsuario,
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

var apiProtectedRouter = express.Router();
apiProtectedRouter.use(function(request, response, next){
    var token = request.get("Authorization");
    if(token && token.includes("Bearer")) {
        token = token.replace("Bearer ","");
        jsonwebtoken.verify(token.trim(), config.jwtSecret, function(error, decoded){
            if(error) {
                console.log("jwt error: " + error);
                response.status(401).send("Invalid Token. Error Message: " + error);
            } else {
                console.log("decoded", decoded)
                request.decodedToken = decoded;
                return next();
            }
        });
    } else {
        response.status(401).send("Necesita un token.");
    }
});

app.use("/protected", apiProtectedRouter);

app.post('/usuarios',async (req, res) => {
  let result = await new UsuariosLogic().DAO.insert(req.body);
  let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  res.send(serverResponse.status,serverResponse.translateToUser());
})

apiProtectedRouter.post('/items',async (req, res) => {

  let result = await new ItemsLogic().insertNewItem(req.decodedToken.id,req.body,"duenio");
  let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  res.status(serverResponse.status).send(serverResponse.translateToUser());
  //res.send(result);
})

apiProtectedRouter.post('/items/compartir',async (req, res) => {
  console.log("BODI:",req.body)
  const idItem = req.body.idItem;
  const tipoPermiso = req.body.tipoPermiso;
  const arrayMailsUsuarios = req.body.arrayMailsUsuarios;
  if(!idItem || !tipoPermiso || !arrayMailsUsuarios){
    res.status(400).send("Los campos son: idItem, tipoPermiso ('read','read-write','duenio'), arrayMailsUsuarios. Alguno esta faltando.")
  }

  let result = await new ItemsLogic().compartirItemConMuchos(idItem,tipoPermiso,arrayMailsUsuarios);
  //let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  //res.send(serverResponse.status,serverResponse.translateToUser());
  res.send(result);
})

apiProtectedRouter.get('/items',async (req, res) => {
  console.log(req.body)
  console.log("dec token",req.decodedToken)
  let result = await new ItemsLogic().getUserItems(req.decodedToken.id);
  let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  console.log("uguuu",serverResponse)
  // res.send(serverResponse.status,serverResponse.translateToUser());
  res.send(serverResponse.content);
})

apiProtectedRouter.post('/importFromMoodle',async (request, response) => {
  console.log(request.body)
  console.log("dec token",request.decodedToken)

let importResult =await new ImportarLogic().importarDeMoodle()
console.log("importResult",importResult)
  
  // const req = http.request(options, (res) => {
  //   let respuesta = '';
  
  //   res.on('data', (chunk) => {
  //     respuesta += chunk;
  //   });
  
  //   res.on('end', () => {
  //     console.log(`Response: ${respuesta}`);
  //     response.send(JSON.parse(respuesta));
  //   });
  // });
  
  // req.on('error', (error) => {
  //   console.error(`Request error: ${error}`);
  // });
  
  // req.write(postData);
  // req.end();


  // let result = await new ItemsLogic().getUserItems(req.decodedToken.id);
  // let serverResponse = Utils.eitherServerResponseToUserResponse(result);
  // console.log("uguuu",serverResponse)
  // // res.send(serverResponse.status,serverResponse.translateToUser());
  // res.send(serverResponse.content);
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
