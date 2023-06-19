class ServerResponse{
    constructor(status,errors){
        this.status = status;
        this.errors = errors??[];
    }
    translateToUser(){
        if(this.errors.length==0){
            return `Status: ${this.status}.`
        }else{
            return "Errors found:\n" + this.errors.reduce((previous,error)=>previous +"\n" +error)
        }
    }
}

module.exports = ServerResponse