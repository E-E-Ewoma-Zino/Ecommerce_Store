const mongoose = require("mongoose");

// @desc    Page Schema
const pageSchema = mongoose.Schema({
    website: Object,
    home: Object,
    checkout: Object,
    contact: Object,
    category: Object,
    cart: Object,
    single: Object,
    addProduct: Object
});



module.exports = new mongoose.model("Page", pageSchema);