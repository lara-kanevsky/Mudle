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
    const entityKeys = Object.keys(entity);
    const extraKeys = Object.keys(entityToValidate).filter(
      (key) => !entityKeys.includes(key)
    );
  
    if (extraKeys.length > 0) {
      errMessages.push(`Excess keys found: ${extraKeys.join(', ')}`);
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
  if (obj && obj.constructor === Array && typeof obj.length === 'number') {
    return obj.length >= 0 && Number.isInteger(obj.length);
  }
  return false;
}

function fuseLefts(arrayOfLefts){
  console.log("arrayOfLefts",arrayOfLefts[0].getLeft())
  console.log("arrayOfLefts map",arrayOfLefts.flatMap(leftObj=>leftObj.getLeft()))
  return Either.left(arrayOfLefts.flatMap(leftObj=>leftObj.getLeft()));
}

function getRightResultsOrALeft(arrayOfEithers){
  let lefts = arrayOfEithers.filter(eitherObj=>eitherObj.isLeft())
  return lefts.length>0?fuseLefts(lefts):Either.right(arrayOfEithers.filter(eitherObj=>eitherObj.isRight()));
}

function getObjectInstance(realObj,inputObj){
  return{ ...realObj, ...inputObj}
}

module.exports={
    basicValidator,
    eitherServerResponseToUserResponse,
    getRightResultsOrALeft,
    getObjectInstance,
    isArrayLike
}