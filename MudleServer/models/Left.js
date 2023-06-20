const Either = require('./Either.js')
class Left {
  constructor(value){
    this.value = value;
    }
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
  module.exports = Left