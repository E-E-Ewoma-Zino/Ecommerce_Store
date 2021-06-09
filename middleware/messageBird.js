// this file recieves and sends message from and to any route

module.exports = {
    fly: {},
    kill(){
        this.fly = {};
    },
    message(alert, message){
        this.kill();
        this.fly.alert = alert;
        this.fly.message = message;
    }
}