const express = require('express')
const config = require('./config')
const Either = require('./models/Either')
const Left = require('./models/Left')
const Right = require('./models/Right')
const UsuariosLogic = require('./logics/UsuariosLogic')
const AuthenticationLogic = require('./logics/AuthenticationLogic')
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
  console.log("req body",request.body)
  var mail = request.body.mail;
  var password = request.body.password;
  if(!mail || !password) {
      response.status(400).send("Bad request");
  } else {
    let userFound = await AuthenticationLogic.userCredentialsAreValid(mail, password);
      if(userFound.isRight()) {
          var claim = {
              id: userFound.getRight()._id,
              role: "admin"
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
        response.status(401).send("No access token found");
    }
});

app.use("/protected", apiProtectedRouter);

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
