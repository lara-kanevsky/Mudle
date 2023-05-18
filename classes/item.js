class Item{
    constructor(title,content,parentNode){
        this.parentNode=parentNode??-1;
        this.title=title??"Sin titulo";
        this.content=content??"Sin contenido";
    }
}

module.exports = Item;