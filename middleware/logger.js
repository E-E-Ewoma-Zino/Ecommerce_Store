
// This code helps me console.log() to the console when in development mode


module.exports = {
    log: (...All)=>{
        if(process.env.NODE_ENV == "Development") console.log(All);
    },
    err: (...All)=>{
        if(process.env.NODE_ENV == "Development") console.log("Unexpected Error: ", All);
    }
} 