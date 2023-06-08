const Either = require('./Either.js')
module.exports = class Right extends Either {
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