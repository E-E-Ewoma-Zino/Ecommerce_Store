//  Configure mongodb for online and local DB
module.exports = async (mongoose) => {
    try {
        const connected = await mongoose.connect("mongodb://localhost:27017/e-storeDB", {
        // const connected = await mongoose.connect(process.env.MONGO_URL, {
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
