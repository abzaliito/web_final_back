const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: Number, // ID from Fake Store API
            title: String,
            price: Number,
            quantity: { type: Number, default: 1 },
            image: String
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" }, // pending, completed, cancelled
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
