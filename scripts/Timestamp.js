class Timestamp{
    constructor(){

    }
}

Timestamp.prototype.returnDay = function(utcday){
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[utcday-1];
}
Timestamp.prototype.returnMonth = function(num){
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[num];
}
Timestamp.prototype.adjustTime = function(time){
    if (time < 10) {
        return `0${time}`
    }else{
        return time
    }
}

Timestamp.prototype.getTimestamp = function(){
    let dateObj         = new Date();
    this.dayOfWeek      = this.returnDay(dateObj.getUTCDay());
    this.dateInMonth    = dateObj.getDate();
    this.monthInYear    = this.returnMonth(dateObj.getMonth());
    this.year           = dateObj.getFullYear();
    this.hours          = this.adjustTime(dateObj.getHours());
    this.minutes        = this.adjustTime(dateObj.getMinutes());
    this.seconds        = this.adjustTime(dateObj.getSeconds());
    return `${this.dayOfWeek} ${this.dateInMonth} ${this.monthInYear} ${this.year}, ${this.hours}:${this.minutes}:${this.seconds}`
}


module.exports = Timestamp;