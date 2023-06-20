const Left = require('./Left')
const Right = require('./Right')
class Either {
    constructor(value) {
      this.value = value;
    }
  
    static left(error) {
      return new Left(error);
    }
  
    static right(value) {
      return new Right(value);
    }
  }
  module.exports = Either