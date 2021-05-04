require("dotenv").config({path: "./config/config.env"});
const bodyParser = require("body-parser");
const connectDB =  require("./config/db");
const methodOveride = require("method-override");
const express = require("express");
const path = require("path");

const app = express();

// Configure the DB
connectDB();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOveride((req, res)=>{
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        // looks in url post bodies and delete it
        let method = req.body._method;
        delete req.body._method;
        return method
    }
}));

// @route
// home
app.use("/", require("./routes/index"));
// category
app.use("/category", require("./routes/category"));
// admin
app.use("/admin", require("./routes/admin"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));