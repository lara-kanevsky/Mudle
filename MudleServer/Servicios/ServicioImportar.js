const Item = require('../models/Item');

class ServicioImportar{
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

module.exports = ServicioImportar;