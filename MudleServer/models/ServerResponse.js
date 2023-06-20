class ServerResponse{
    constructor(status,errors,content){
        this.status = status;
        this.errors = errors??[];
        this.content = content??"";
    }
    translateToUser(){
        if(this.errors.length==0){
            return `Status: ${this.status}.\n Content:`
        }else{
            return "Errors found:\n" + this.errors.reduce((previous,error)=>previous +"\n" +error)
        }
    }
}

module.exports = ServerResponse