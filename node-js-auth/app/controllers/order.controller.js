const db = require("../models");
const Order = db.order;

exports.createOrder = async (req, res) => {
    try {
        const order = new Order({
            user: req.userId,
            products: req.body.products,
            totalAmount: req.body.totalAmount,
            status: req.body.status || "pending"
        });

        const savedOrder = await order.save();
        res.send({ message: "Order was created successfully!", order: savedOrder });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId });
        res.status(200).send(orders);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
