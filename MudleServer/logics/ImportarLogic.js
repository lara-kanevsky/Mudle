const http = require('http');

class ImportarLogic{
    async importarDeMoodle(idUser){

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
      const req =await http.request(options, (res) => {
        let respuesta = '';
      
        res.on('data', (chunk) => {
          respuesta += chunk;
        });
      
        res.on('end', () => {
          respuestaDeLaAPI =JSON.parse(respuesta);
        });
      });
      
      req.on('error', (error) => {
        console.error(`Request error: ${error}`);
      });
      
      req.write(postData);
      req.end();
      return respuestaDeLaAPI;
    }
}
module.exports = ImportarLogic