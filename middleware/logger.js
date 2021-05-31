
// This code helps me console.log() to the console when in development mode


module.exports = {
    log: (str)=>{
        if(process.env.NODE_ENV == "Development") console.log(str);
    },
    logArg: (str,arg)=>{
        if(process.env.NODE_ENV == "Development") console.log(str, arg);
    },
    logArg2: (str,arg, arg2)=>{
        if(process.env.NODE_ENV == "Development") console.log(str, arg, arg2);
    },
    logArg3: (str,arg, arg2, arg3)=>{
        if(process.env.NODE_ENV == "Development") console.log(str, arg, arg2, arg3);
    },
} 