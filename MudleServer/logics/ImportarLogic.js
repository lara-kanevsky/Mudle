const http = require('http');
const Left = require('../models/Left')
const Right = require('../models/Right')
const Either = require('../models/Either')
const Item = require('../models/Item')
const UsuariosLogic = require('./UsuariosLogic')
class ImportarLogic{
    async importarDeMoodle(idUser){
      let usuarioResponse = await new UsuariosLogic().getUser(idUser);
      if(usuarioResponse.isLeft()){
        return usuarioResponse;
      }
      let usuario = usuarioResponse.getRight();
      if(usuario.moodleCredentials==null){
return Either.left("El usuario no tiene cargadas las credenciales de Moodle.")
      }
      console.log("mod cred",usuario.moodleCredentials)
      let items = await this.getItemsFromAPI(usuario.moodleCredentials.username,usuario.moodleCredentials.password);



      return items

    }

    async getItemsFromAPI(username,password){

      const postData = JSON.stringify({
        username:username,
        password:password
      });
    
      const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/items',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      let respuestaDeLaAPI ="";
      const req =http.request(options, (res) => {
        let respuesta = '';

        res.on('data', (chunk) => {
          respuesta += chunk;
        });

        res.on('end', () => {
          console.log(respuesta);
          respuestaDeLaAPI = this.parseAPIItems(JSON.parse(respuesta));
        });
      });
      console.log(req)
      req.on('error', (error) => {
        console.error(`Request error: ${error}`);
      });
      
       req.write(postData);
       req.end();
      console.log("resp api",respuestaDeLaAPI)
      return respuestaDeLaAPI;
    }
    parseAPIItems(apiItems,idUser){
      return apiItems.map(apiItem=>{
        let item = new Item(apiItem.name);
        item.tipoItem = apiItem.type;
        item.exportedId = this.extractIdFromUrl(apiItem.url)
        //item.duenio=idUser
        return item;
      })
    }
    extractIdFromUrl(url) {
      const urlObj = new URL(url);
      const params = new URLSearchParams(urlObj.search);
      return params.get("id");
    }
}
module.exports = ImportarLogic