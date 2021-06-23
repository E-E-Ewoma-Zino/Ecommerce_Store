// this file recieves and sends message from and to any route

module.exports = {
    fly: [],
    kill(){
        setTimeout(() => {
            this.fly.shift();            
        }, 13000);
    },
    message(alert, message){
        this.fly.push({
            alert: alert,
            message: JSON.stringify(message)
        })
        
        this.kill();
    }
}