
{
    
    class Stringer {
        constructor(requestObject, modemType, config){
            this.requestObject = requestObject,
            this.modemType = modemType,
            this.config = config
        }
    }

    Stringer.prototype.returnString = function(){
       if (this.config==='aquilaOnKey') {
           if (this.modemType==='cisco') {
                return `${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOn} \n`
           }else{
                return  `${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOn.part1} \n${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOn.part2} \n`
           }
       }else{
           if (this.modemType==='cisco'){
                return `${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOff} \n`
           }else{
                return `${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOff.part1} \n${this.requestObject.config.pre} ${this.requestObject.wc} ${this.requestObject.modemIP} ${this.requestObject.config.OIDOff.part2} \n` 
           }
       }
    }

    module.exports = Stringer;
}