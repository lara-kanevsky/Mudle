const Either = require('./Either')
const Left = require('./Left.js')
const Right = require('./Right.js')
function basicValidator (entity,entityToValidate,necessaryKeys){
    necessaryKeys =necessaryKeys ?? Object.keys(entity);
  let errMessages = []
    for (let i = 0; i < necessaryKeys.length; i++) {
      const key = necessaryKeys[i];
      
      if (!(key in entityToValidate) || entityToValidate[key] === null) {
        errMessages.push(`Key "${key}" missing.`)
      }
    }
    return errMessages.length==0 ? Either.right(true) : Either.left(errMessages)
}

function eitherServerResponseToUserResponse(result){
  console.log("result",result)
  if(result.isRight()){
    return result.getRight();
  }else{
    return result.getLeft();
  }
}

function isArrayLike(obj){
  if (obj && typeof obj.length === 'number') {
    return obj.length >= 0 && Number.isInteger(obj.length);
  }
  return false;
}

module.exports={
    basicValidator,
    eitherServerResponseToUserResponse
}