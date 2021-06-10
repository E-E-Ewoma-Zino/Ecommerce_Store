const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        
        console.log(`Connected Successfully at ${connected.connection.host}`);
    } catch (err) {
        console.error(":::::::::::::>" + err);
        process.exit(1);
    }
}

module.exports = connectDB;