const Either = require('./Either.js')
module.exports = class Right {
constructor(value){
this.value = value;
}

    isLeft() {
      return false;
    }
  
    isRight() {
      return true;
    }
  
    get() {
      return this.value;
    }
  
    getLeft() {
      throw new Error('Cannot get value from Right');
    }
  
    getRight() {
      return this.value;
    }
  }