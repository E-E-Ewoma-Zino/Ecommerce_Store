// this file recieves and sends message from and to any route

module.exports = {
    fly: {}, 
    message(alert, message){
        this.fly.alert = alert;
        this.fly.message = message;
    }
}