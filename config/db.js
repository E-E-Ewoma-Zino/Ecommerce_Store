const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connected = await mongoose.connect("mongodb://localhost:27017/e-storeDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`Connected Successfully at ${connected.connection.host}`);
    } catch (err) {
        console.error(":::::::::::::" + err);
        process.exit(1);
    }
}

module.exports = connectDB;