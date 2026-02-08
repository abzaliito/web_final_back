const mongoose = require("mongoose");

const Product = mongoose.model(
    "Product",
    new mongoose.Schema({
        name: String,
        category: String,
        price: Number,
        rating: Number,
        image: String,
        specs: {
            type: Map,
            of: String
        }
    })
);

module.exports = Product;
