const express = require('express')

const config = require('./config')
var jsonwebtoken = require("jsonwebtoken");
const app = express();
const port = config.serverPort;

app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.use("/autenticacion", require("./Rutas/RutaAutenticacion"))

var apiProtectedRouter = express.Router();

apiProtectedRouter.use(function(request, response, next){
    const token = request.get("Authorization")?.replace('Bearer ', '');
    try{
      const decoded = jsonwebtoken.verify(token, config.jwtSecret);
      console.log("decoded", decoded)
      request.decodedToken = decoded;
      return next();
    }
    catch(error){
      console.log("jwt error: ", error);
      response.status(401).send("Token inválido. Error: " + error);
    }
});

app.use("/protected", apiProtectedRouter);

apiProtectedRouter.use("/usuarios", require('./Rutas/RutaUsuario'))
apiProtectedRouter.use("/items", require('./Rutas/RutaItem'))
apiProtectedRouter.use("/importFromMoodle", require('./Rutas/RutaImportacion'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app