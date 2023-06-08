const Either = require('./Either.js')
module.exports = class Left extends Either {
    isLeft() {
      return true;
    }
  
    isRight() {
      return false;
    }
  
    get() {
      throw new Error('Cannot get value from Left');
    }
  
    getLeft() {
      return this.value;
    }
  
    getRight() {
      throw new Error('Cannot get value from Left');
    }
  }